'use client';

export default function DigitalClock() {
  return (
    <div>
      <div className="system-24">
        <span id="Hours">00</span>
        <span id="Minutes">00</span>
        <span id="Seconds">00</span>
      </div>
      <hr />
      <div className="system-12">
        <span id="Hours">00</span>
        <span id="Minutes">00</span>
        <span id="Seconds">00</span>
        <i id="flag">**</i>
      </div>
    </div>
  );
}
