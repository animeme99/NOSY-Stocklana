
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signClass = exports.windowLabel = exports.fullTime = exports.time = exports.percent = exports.price = exports.shorten = exports.escape = void 0;
exports.money = money;
exports.ago = ago;
const escape = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
exports.escape = escape;
const shorten = (s) => s.length > 16 ? `${s.slice(0, 6)}…${s.slice(-4)}` : s;
exports.shorten = shorten;
/** Exact cents formatting. Never convert the full 18-decimal integer into a float. */
function money(v, signed = false, compact = false) {
    if (v === null || v === undefined)
        return '—';
    try {
        const a = BigInt(v), neg = a < 0n, abs = neg ? -a : a, unit = 10n ** 18n, whole = abs / unit;
        let result;
        if (compact && whole >= 1000000n)
            result = `${Number(abs * 10n / (unit * 1000000n)) / 10}m`;
        else if (compact && whole >= 10000n)
            result = `${Number(abs * 10n / (unit * 1000n)) / 10}k`;
        else {
            const cents = ((abs % unit) * 100n / unit).toString().padStart(2, '0');
            result = whole.toLocaleString('en-US') + (cents === '00' ? '' : '.' + cents);
        }
        return (neg ? '−' : signed && a > 0n ? '+' : '') + result;
    }
    catch {
        return '—';
    }
}
const price = (s) => !s || !Number.isFinite(Number(s)) ? '—' : Number(s).toLocaleString('en-US', { minimumFractionDigits: 2, maximumSignificantDigits: 5 });
exports.price = price;
const percent = (n, signed = false, dp = 1) => n === null || !Number.isFinite(n) ? '—' : `${n < 0 ? '−' : signed && n > 0 ? '+' : ''}${Math.abs(n).toFixed(dp)}%`;
exports.percent = percent;
const time = (ts) => !ts ? '—' : new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }).format(ts * 1000);
exports.time = time;
const fullTime = (ts) => !ts ? 'Not available' : new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' }).format(ts * 1000) + ' UTC';
exports.fullTime = fullTime;
function ago(ts, now = Date.now() / 1000) { if (!ts)
    return 'Not connected'; const d = Math.max(0, now - ts); return d < 60 ? 'just now' : d < 3600 ? `${Math.floor(d / 60)}m ago` : d < 86400 ? `${Math.floor(d / 3600)}h ago` : `${Math.floor(d / 86400)}d ago`; }
const windowLabel = (w) => w === 900 ? '15m' : w === 3600 ? '1h' : w%86400===0 ? `${w/86400}d` : w%3600===0 ? `${w/3600}h` : `${Math.round(w / 60)}m`;
exports.windowLabel = windowLabel;
const signClass = (n) => n && BigInt(n) < 0n ? 'negative' : n && BigInt(n) > 0n ? 'positive' : 'muted';
exports.signClass = signClass;

