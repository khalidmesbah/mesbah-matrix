'use client';

import styles from '@/styles/analog-clock.module.scss';
import { useLayoutEffect, useRef } from 'react';

const scale = (child: HTMLDivElement | null): number => {
  if (!child) return 1;
  const parent = child.parentElement;
  if (!parent) return 1;
  const parentWidth = parent.offsetWidth;
  const childWidth = child.offsetWidth;
  const number = parentWidth / childWidth;
  return number;
};

export default function AnalogClock() {
  const secondsHand = useRef<HTMLDivElement>(null);
  const minutesHand = useRef<HTMLDivElement>(null);
  const hoursHand = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      const child = clockRef.current;
      const parent = child?.parentElement;
      if (!child || !parent) return;

      const childWidth = child.offsetWidth;
      const parentWidth = parent.offsetWidth;

      child.style.setProperty('scale', `${parentWidth / childWidth}`);
    }, 0);

    const updateTime = () => {
      const d = new Date();
      let milliSecondsHandRotation = d.getMilliseconds() / 1000;
      let secondsHandRotation = (milliSecondsHandRotation + d.getSeconds()) / 60;
      let minutesHandRotation = (secondsHandRotation + d.getMinutes()) / 60;
      let hoursHandRotation = (minutesHandRotation + d.getHours()) / 12;

      if (!secondsHand.current || !minutesHand.current || !hoursHand.current) return;

      secondsHand.current.style.transform = `rotate(${secondsHandRotation * 360}deg)`;
      minutesHand.current.style.transform = `rotate(${minutesHandRotation * 360}deg)`;
      hoursHand.current.style.transform = `rotate(${hoursHandRotation * 360}deg)`;
    };
    const interval = setInterval(updateTime, 1);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`${styles.clock} bg-primary/50 transition-all duration-200`}
      ref={clockRef}
      style={{ scale: scale(clockRef.current) }}
    >
      <div className={styles.inside}>
        <span className={`${styles.span} ${styles['span-1']}`}></span>
        <span className={`${styles.span} ${styles['span-2']}`}></span>
        <span className={`${styles.span} ${styles['span-3']}`}></span>
        <span className={`${styles.span} ${styles['span-4']}`}></span>
        <span className={`${styles.span} ${styles['span-5']}`}></span>
        <span className={`${styles.span} ${styles['span-6']}`}></span>
        <span className={`${styles.span} ${styles['span-7']}`}></span>
        <span className={`${styles.span} ${styles['span-8']}`}></span>
        <span className={`${styles.span} ${styles['span-9']}`}></span>
        <span className={`${styles.span} ${styles['span-10']}`}></span>
        <span className={`${styles.span} ${styles['span-11']}`}></span>
        <span className={`${styles.span} ${styles['span-12']}`}></span>
        <span className={`${styles.span} ${styles['span-13']}`}></span>
        <span className={`${styles.span} ${styles['span-14']}`}></span>
        <span className={`${styles.span} ${styles['span-15']}`}></span>
        <span className={`${styles.span} ${styles['span-16']}`}></span>
        <span className={`${styles.span} ${styles['span-17']}`}></span>
        <span className={`${styles.span} ${styles['span-18']}`}></span>
        <span className={`${styles.span} ${styles['span-19']}`}></span>
        <span className={`${styles.span} ${styles['span-20']}`}></span>
        <span className={`${styles.span} ${styles['span-21']}`}></span>
        <span className={`${styles.span} ${styles['span-22']}`}></span>
        <span className={`${styles.span} ${styles['span-23']}`}></span>
        <span className={`${styles.span} ${styles['span-24']}`}></span>
        <span className={`${styles.span} ${styles['span-25']}`}></span>
        <span className={`${styles.span} ${styles['span-26']}`}></span>
        <span className={`${styles.span} ${styles['span-27']}`}></span>
        <span className={`${styles.span} ${styles['span-28']}`}></span>
        <span className={`${styles.span} ${styles['span-29']}`}></span>
        <span className={`${styles.span} ${styles['span-30']}`}></span>
        <span className={`${styles.span} ${styles['span-31']}`}></span>
        <span className={`${styles.span} ${styles['span-32']}`}></span>
        <span className={`${styles.span} ${styles['span-33']}`}></span>
        <span className={`${styles.span} ${styles['span-34']}`}></span>
        <span className={`${styles.span} ${styles['span-35']}`}></span>
        <span className={`${styles.span} ${styles['span-36']}`}></span>
        <span className={`${styles.span} ${styles['span-37']}`}></span>
        <span className={`${styles.span} ${styles['span-38']}`}></span>
        <span className={`${styles.span} ${styles['span-39']}`}></span>
        <span className={`${styles.span} ${styles['span-40']}`}></span>
        <span className={`${styles.span} ${styles['span-41']}`}></span>
        <span className={`${styles.span} ${styles['span-42']}`}></span>
        <span className={`${styles.span} ${styles['span-43']}`}></span>
        <span className={`${styles.span} ${styles['span-44']}`}></span>
        <span className={`${styles.span} ${styles['span-45']}`}></span>
        <span className={`${styles.span} ${styles['span-46']}`}></span>
        <span className={`${styles.span} ${styles['span-47']}`}></span>
        <span className={`${styles.span} ${styles['span-48']}`}></span>
        <span className={`${styles.span} ${styles['span-49']}`}></span>
        <span className={`${styles.span} ${styles['span-50']}`}></span>
        <span className={`${styles.span} ${styles['span-51']}`}></span>
        <span className={`${styles.span} ${styles['span-52']}`}></span>
        <span className={`${styles.span} ${styles['span-53']}`}></span>
        <span className={`${styles.span} ${styles['span-54']}`}></span>
        <span className={`${styles.span} ${styles['span-55']}`}></span>
        <span className={`${styles.span} ${styles['span-56']}`}></span>
        <span className={`${styles.span} ${styles['span-57']}`}></span>
        <span className={`${styles.span} ${styles['span-58']}`}></span>
        <span className={`${styles.span} ${styles['span-59']}`}></span>
        <span className={`${styles.span} ${styles['span-0']}`}></span>
      </div>
      <div className={`${styles.hand} ${styles['seconds-hand']}`} ref={secondsHand}></div>
      <div className={`${styles.hand} ${styles['minutes-hand']}`} ref={minutesHand}></div>
      <div className={`${styles.hand} ${styles['hours-hand']}`} ref={hoursHand}></div>
      <div className={styles.center}></div>
    </div>
  );
}
