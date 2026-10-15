import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Info,
  Lock,
  MapPin,
  RotateCcw,
  Send,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";
import { usePageMeta } from "../components/ui";

type BookingStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";
type ViewMode = "customer" | "owner";

type Booking = {
  id: string;
  status: BookingStatus;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  pickup: string;
  destination: string;
  notes: string;
  demo?: boolean;
};

type Block = {
  id: string;
  date: string;
  time: string | "all-day";
  reason: string;
};

type DemoStore = {
  bookings: Booking[];
  blocks: Block[];
};

const STORAGE_KEY = "lees-taxi-booking-demo-v1";
const SLOT_TIMES = ["08:00", "10:00", "12:00", "14:00", "16:00"];
const SERVICES = ["Airport Transfer", "Tour", "Car Rental"];
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateKey = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const nextWeekday = (date: Date, offset: number) => {
  let result = addDays(date, offset);
  while (result.getDay() === 0) result = addDays(result, 1);
  return result;
};

const formatLongDate = (key: string) =>
  parseDateKey(key).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

const formatShortDate = (key: string) =>
  parseDateKey(key).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

function createSeedStore(): DemoStore {
  const today = new Date();
  const approvedDate = formatDateKey(nextWeekday(today, 2));
  const pendingDate = formatDateKey(nextWeekday(today, 5));
  const blockedDate = formatDateKey(nextWeekday(today, 1));

  return {
    bookings: [
      {
        id: "demo-approved",
        status: "Approved",
        service: "Airport Transfer",
        date: approvedDate,
        time: "10:00",
        name: "Sample guest",
        phone: "+1 242-555-0140",
        email: "sample.guest@example.com",
        pickup: "Deadman's Cay Airport",
        destination: "Cape Santa Maria Beach Resort",
        notes: "Demo booking — not a real customer.",
        demo: true,
      },
      {
        id: "demo-pending",
        status: "Pending",
        service: "Tour",
        date: pendingDate,
        time: "14:00",
        name: "Demo tour guest",
        phone: "+1 242-555-0188",
        email: "demo.tour@example.com",
        pickup: "Stella Maris Airport",
        destination: "Dean's Blue Hole",
        notes: "Demo request awaiting owner approval.",
        demo: true,
      },
    ],
    blocks: [
      { id: "demo-block", date: blockedDate, time: "16:00", reason: "Personal commitment (demo)" },
    ],
  };
}

function loadStore(): DemoStore {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as DemoStore;
  } catch {
    // The demo remains usable when storage is unavailable.
  }
  return createSeedStore();
}

const initialForm = {
  name: "",
  phone: "",
  email: "",
  pickup: "",
  destination: "",
  notes: "",
};

function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-wide",
        status === "Approved" && "bg-ocean-600/12 text-ocean-800",
        status === "Pending" && "bg-gold-400/20 text-ink-800",
        status === "Rejected" && "bg-conch-100 text-conch-600",
        status === "Cancelled" && "bg-ink-900/8 text-ink-700/70"
      )}
    >
      {status}
    </span>
  );
}

function DemoNotice() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-ocean-600/15 bg-ocean-50 p-4 text-sm leading-relaxed text-ink-800">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-ocean-700" aria-hidden />
      <p>
        <strong>Demo mode:</strong> sample requests and availability are stored only in this browser. No emails,
        payments, or real confirmations are sent.
      </p>
    </div>
  );
}

export default function BookingDemo() {
  usePageMeta(
    "Booking Calendar Demo — Lee's Taxi Services #14",
    "Try the Lee's Taxi Services #14 booking calendar demo for airport transfers, tours and car rentals."
  );

  const [store, setStore] = useState<DemoStore>(loadStore);
  const [view, setView] = useState<ViewMode>("customer");
  const [selectedDate, setSelectedDate] = useState(formatDateKey(nextWeekday(new Date(), 1)));
  const [selectedTime, setSelectedTime] = useState("");
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [service, setService] = useState(SERVICES[0]);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [blockReason, setBlockReason] = useState("Busy / unavailable");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Browser-only demo functionality still works for the current session.
    }
  }, [store]);

  const activeBookings = useMemo(
    () => store.bookings.filter((booking) => booking.status === "Pending" || booking.status === "Approved"),
    [store.bookings]
  );

  const isDateAvailable = (date: string) => {
    const weekday = parseDateKey(date).getDay();
    const today = formatDateKey(new Date());
    return date >= today && weekday !== 0 && !store.blocks.some((block) => block.date === date && block.time === "all-day");
  };

  const isSlotAvailable = (date: string, time: string) =>
    isDateAvailable(date) &&
    !store.blocks.some((block) => block.date === date && (block.time === time || block.time === "all-day")) &&
    !activeBookings.some((booking) => booking.date === date && booking.time === time);

  const calendarDays = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());
    return Array.from({ length: 42 }, (_, index) => addDays(start, index));
  }, [month]);

  const upcomingBookings = useMemo(
    () =>
      [...store.bookings]
        .filter((booking) => booking.status !== "Rejected" && booking.status !== "Cancelled")
        .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [store.bookings]
  );

  const updateBooking = (id: string, status: BookingStatus) => {
    setStore((current) => ({
      ...current,
      bookings: current.bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)),
    }));
  };

  const toggleBlock = (time: string | "all-day") => {
    const existing = store.blocks.find((block) => block.date === selectedDate && block.time === time);
    if (existing) {
      setStore((current) => ({ ...current, blocks: current.blocks.filter((block) => block.id !== existing.id) }));
      return;
    }
    setStore((current) => ({
      ...current,
      blocks: [...current.blocks, { id: `block-${Date.now()}`, date: selectedDate, time, reason: blockReason }],
    }));
    if (selectedTime === time) setSelectedTime("");
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!selectedTime || !isSlotAvailable(selectedDate, selectedTime)) {
      setError("That slot is no longer available. Please choose another date or time.");
      return;
    }
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      status: "Pending",
      service,
      date: selectedDate,
      time: selectedTime,
      ...form,
    };
    setStore((current) => ({ ...current, bookings: [...current.bookings, booking] }));
    setSubmitted(booking);
    setForm(initialForm);
    setSelectedTime("");
  };

  const resetDemo = () => {
    const fresh = createSeedStore();
    setStore(fresh);
    setSubmitted(null);
    setError("");
    setSelectedTime("");
  };

  return (
    <div className="bg-sand-50 pt-28 pb-24 sm:pt-36">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-ocean-600">
              <span className="inline-block h-px w-8 bg-ocean-600" aria-hidden />
              Booking calendar demo
            </p>
            <h1 className="font-display mt-4 text-4xl leading-[1.08] font-medium text-ink-900 text-balance sm:text-6xl">
              A simpler way to <span className="italic font-normal text-ocean-700">plan the ride.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700/85 sm:text-lg">
              Choose an available slot and send a request. Lee reviews every request before a booking is confirmed.
            </p>
          </div>
          <div className="flex rounded-full border border-ink-900/10 bg-white p-1.5 shadow-soft" aria-label="Demo view">
            <button
              type="button"
              onClick={() => setView("customer")}
              className={cn("inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors", view === "customer" ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-sand-100")}
              aria-pressed={view === "customer"}
            >
              <UserRound className="h-4 w-4" aria-hidden /> Customer view
            </button>
            <button
              type="button"
              onClick={() => setView("owner")}
              className={cn("inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors", view === "owner" ? "bg-ocean-600 text-white" : "text-ink-700 hover:bg-sand-100")}
              aria-pressed={view === "owner"}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden /> Owner dashboard
            </button>
          </div>
        </div>

        <div className="mt-8">
          <DemoNotice />
        </div>

        {view === "customer" ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[2rem] border border-ink-900/8 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="availability-heading">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-ocean-600">Step 1</p>
                  <h2 id="availability-heading" className="font-display mt-2 text-3xl font-semibold text-ink-900">Pick a date & time</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 hover:bg-sand-100" aria-label="Previous month"><ChevronLeft className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 hover:bg-sand-100" aria-label="Next month"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-7 flex items-center gap-2 text-lg font-bold text-ink-900">
                <CalendarDays className="h-5 w-5 text-ocean-600" aria-hidden />
                {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[0.68rem] font-bold uppercase tracking-wide text-ink-700/50">
                {WEEKDAY_NAMES.map((day) => <span key={day} className="py-2">{day}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Availability calendar">
                {calendarDays.map((date) => {
                  const key = formatDateKey(date);
                  const inMonth = date.getMonth() === month.getMonth();
                  const available = isDateAvailable(key) && SLOT_TIMES.some((time) => isSlotAvailable(key, time));
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={!available}
                      onClick={() => { setSelectedDate(key); setSelectedTime(""); setSubmitted(null); }}
                      className={cn(
                        "relative flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition-colors",
                        !inMonth && "text-ink-900/20",
                        inMonth && available && "text-ink-900 hover:bg-ocean-50",
                        inMonth && !available && "cursor-not-allowed text-ink-900/25 line-through",
                        selectedDate === key && "bg-ocean-600 text-white hover:bg-ocean-700"
                      )}
                      aria-label={`${formatLongDate(key)}${available ? "" : " unavailable"}`}
                      aria-pressed={selectedDate === key}
                    >
                      {date.getDate()}
                      {available && selectedDate !== key && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-ocean-500" aria-hidden />}
                    </button>
                  );
                })}
              </div>
              <div className="mt-7 border-t border-ink-900/8 pt-6">
                <p className="text-sm font-bold text-ink-900">{formatLongDate(selectedDate)}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SLOT_TIMES.map((time) => {
                    const available = isSlotAvailable(selectedDate, time);
                    return (
                      <button key={time} type="button" disabled={!available} onClick={() => setSelectedTime(time)} className={cn("flex min-h-11 items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-colors", selectedTime === time ? "border-ocean-600 bg-ocean-600 text-white" : available ? "border-ink-900/12 text-ink-800 hover:border-ocean-500 hover:bg-ocean-50" : "cursor-not-allowed border-ink-900/6 bg-sand-100 text-ink-900/30 line-through")}>
                        <Clock3 className="h-3.5 w-3.5" aria-hidden /> {formatTime(time)}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-ink-700/60">Demo hours: Monday–Saturday, 8:00 AM–5:00 PM. The owner can change availability in the dashboard.</p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-ink-900/8 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="request-heading">
              <p className="eyebrow text-ocean-600">Step 2</p>
              <h2 id="request-heading" className="font-display mt-2 text-3xl font-semibold text-ink-900">Send a request</h2>
              {submitted ? (
                <div className="mt-7 rounded-3xl bg-ocean-50 p-6" role="status">
                  <CheckCircle2 className="h-9 w-9 text-ocean-700" aria-hidden />
                  <h3 className="font-display mt-4 text-2xl font-semibold text-ink-900">Request submitted</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    Thanks, {submitted.name.split(" ")[0]}. Your {submitted.service.toLowerCase()} request for {formatLongDate(submitted.date)} at {formatTime(submitted.time)} is pending owner approval. This demo does not send notifications.
                  </p>
                  <button type="button" onClick={() => setSubmitted(null)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-bold text-white hover:bg-ink-800">Make another request <RotateCcw className="h-4 w-4" /></button>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={submitBooking}>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold tracking-wide text-ink-800" htmlFor="demo-service">Service</label>
                    <select id="demo-service" className="field" value={service} onChange={(event) => setService(event.target.value)}>{SERVICES.map((item) => <option key={item}>{item}</option>)}</select>
                  </div>
                  <div className="rounded-2xl bg-sand-100 p-4 text-sm text-ink-800">
                    <span className="font-bold">{selectedTime ? `${formatLongDate(selectedDate)} · ${formatTime(selectedTime)}` : "Select an available time on the calendar"}</span>
                    {!selectedTime && <span className="mt-1 block text-xs text-ink-700/65">Requests can only be sent for open slots.</span>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-bold tracking-wide text-ink-800">Name<input required className="field mt-1.5" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
                    <label className="text-xs font-bold tracking-wide text-ink-800">Phone<input required type="tel" className="field mt-1.5" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
                  </div>
                  <label className="block text-xs font-bold tracking-wide text-ink-800">Email<input required type="email" className="field mt-1.5" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-bold tracking-wide text-ink-800">Pickup location<input required className="field mt-1.5" placeholder="Airport, hotel or address" value={form.pickup} onChange={(event) => setForm({ ...form, pickup: event.target.value })} /></label>
                    <label className="text-xs font-bold tracking-wide text-ink-800">Destination<input required className="field mt-1.5" placeholder="Where are you going?" value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value })} /></label>
                  </div>
                  <label className="block text-xs font-bold tracking-wide text-ink-800">Additional notes<span className="ml-1 font-normal text-ink-700/55">(optional)</span><textarea className="field mt-1.5 min-h-24 resize-y" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
                  {error && <p className="rounded-xl bg-conch-100 px-4 py-3 text-sm font-semibold text-conch-600" role="alert">{error}</p>}
                  <button type="submit" disabled={!selectedTime} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ocean-600 px-6 text-sm font-bold text-white shadow-soft transition-colors hover:bg-ocean-700 disabled:cursor-not-allowed disabled:bg-ink-900/20"><Send className="h-4 w-4" aria-hidden /> Submit booking request</button>
                  <p className="text-center text-xs leading-relaxed text-ink-700/55">Your request is not a confirmed booking until the owner approves it.</p>
                </form>
              )}
            </section>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[2rem] border border-ink-900/8 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="owner-calendar-heading">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="eyebrow text-ocean-600">Owner controls</p><h2 id="owner-calendar-heading" className="font-display mt-2 text-3xl font-semibold text-ink-900">Availability calendar</h2></div>
                <button type="button" onClick={resetDemo} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink-900/12 px-4 text-xs font-bold text-ink-800 hover:bg-sand-100"><RotateCcw className="h-3.5 w-3.5" /> Reset demo</button>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-sand-100 p-3">
                <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white" aria-label="Previous month"><ChevronLeft className="h-4 w-4" /></button>
                <strong>{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</strong>
                <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white" aria-label="Next month"><ChevronRight className="h-4 w-4" /></button>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[0.68rem] font-bold uppercase tracking-wide text-ink-700/50">{WEEKDAY_NAMES.map((day) => <span key={day} className="py-2">{day}</span>)}</div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date) => {
                  const key = formatDateKey(date);
                  const bookingCount = activeBookings.filter((booking) => booking.date === key).length;
                  const blockedCount = store.blocks.filter((block) => block.date === key).length;
                  return <button key={key} type="button" onClick={() => { setSelectedDate(key); setSelectedTime(""); }} className={cn("relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold", date.getMonth() !== month.getMonth() && "text-ink-900/20", selectedDate === key ? "bg-ocean-600 text-white" : "hover:bg-sand-100")}><span>{date.getDate()}</span><span className="mt-0.5 flex gap-0.5">{bookingCount > 0 && <span className={cn("h-1.5 w-1.5 rounded-full", selectedDate === key ? "bg-white" : "bg-gold-400")} />} {blockedCount > 0 && <span className={cn("h-1.5 w-1.5 rounded-full", selectedDate === key ? "bg-white/60" : "bg-conch-400")} />}</span></button>;
                })}
              </div>
              <div className="mt-7 border-t border-ink-900/8 pt-6">
                <p className="font-bold text-ink-900">{formatLongDate(selectedDate)}</p>
                <div className="mt-3 space-y-2">
                  {SLOT_TIMES.map((time) => {
                    const booking = activeBookings.find((item) => item.date === selectedDate && item.time === time);
                    const block = store.blocks.find((item) => item.date === selectedDate && item.time === time);
                    const allDay = store.blocks.some((item) => item.date === selectedDate && item.time === "all-day");
                    return <div key={time} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-900/8 p-3"><span className="flex items-center gap-2 text-sm font-bold"><Clock3 className="h-4 w-4 text-ocean-600" />{formatTime(time)}</span>{booking ? <span className="flex items-center gap-2 text-sm"><StatusPill status={booking.status} /><span className="hidden text-ink-700/70 sm:inline">{booking.name}</span></span> : (block || allDay) ? <span className="inline-flex items-center gap-2 text-sm font-semibold text-conch-600"><Lock className="h-3.5 w-3.5" /> Blocked</span> : <span className="text-xs font-semibold text-ocean-700">Available</span>}<button type="button" onClick={() => toggleBlock(time)} disabled={Boolean(booking)} className="rounded-full border border-ink-900/10 px-3 py-1.5 text-xs font-bold text-ink-800 hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-35">{block ? "Unblock" : "Block"}</button></div>;
                  })}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <input aria-label="Block reason" value={blockReason} onChange={(event) => setBlockReason(event.target.value)} className="field min-w-48 flex-1" placeholder="Reason for blocking" />
                  <button type="button" onClick={() => toggleBlock("all-day")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-900 px-4 text-xs font-bold text-white hover:bg-ink-800"><Lock className="h-3.5 w-3.5" />{store.blocks.some((block) => block.date === selectedDate && block.time === "all-day") ? "Unblock day" : "Block whole day"}</button>
                </div>
                <p className="mt-3 text-xs text-ink-700/60">Sundays are unavailable in this demo schedule. Blocked slots and active requests are hidden from customers.</p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-ink-900/8 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="requests-heading">
              <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-ocean-600">Owner inbox</p><h2 id="requests-heading" className="font-display mt-2 text-3xl font-semibold text-ink-900">Booking requests</h2></div><span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-bold text-ink-800">{store.bookings.filter((booking) => booking.status === "Pending").length} pending</span></div>
              <div className="mt-6 space-y-3">
                {upcomingBookings.length === 0 ? <div className="rounded-2xl bg-sand-100 p-6 text-center text-sm text-ink-700/65">No upcoming requests. New customer requests will appear here.</div> : upcomingBookings.map((booking) => <article key={booking.id} className="rounded-2xl border border-ink-900/8 p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><div className="flex items-center gap-2"><p className="font-bold text-ink-900">{booking.name}</p>{booking.demo && <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-ink-700">Demo</span>}</div><p className="mt-1 text-xs text-ink-700/65">{formatShortDate(booking.date)} · {formatTime(booking.time)} · {booking.service}</p></div><StatusPill status={booking.status} /></div><p className="mt-3 flex items-start gap-2 text-sm text-ink-800"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-600" />{booking.pickup} → {booking.destination}</p>{booking.status === "Pending" && <div className="mt-4 flex gap-2 border-t border-ink-900/8 pt-3"><button type="button" onClick={() => updateBooking(booking.id, "Approved")} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-ocean-600 px-3 text-xs font-bold text-white hover:bg-ocean-700"><Check className="h-3.5 w-3.5" /> Approve</button><button type="button" onClick={() => updateBooking(booking.id, "Rejected")} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-conch-300 px-3 text-xs font-bold text-conch-600 hover:bg-conch-100"><X className="h-3.5 w-3.5" /> Reject</button></div>}{booking.status === "Approved" && <button type="button" onClick={() => updateBooking(booking.id, "Cancelled")} className="mt-3 inline-flex min-h-9 items-center gap-1.5 text-xs font-bold text-ink-700/65 hover:text-conch-600"><X className="h-3.5 w-3.5" /> Cancel booking</button>}</article>)}
              </div>
              <div className="mt-6 rounded-2xl bg-ink-900 p-4 text-sm leading-relaxed text-sand-100"><strong>How this demo works:</strong> pending requests do not confirm a ride. Approving one blocks its slot; rejecting or cancelling releases it for customers again.</div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
