import type { Buffer } from "buffer";
import type process from "process";

export {};

declare global {
  interface Window {
    Buffer: typeof Buffer;
    process: typeof process;
  }
}
