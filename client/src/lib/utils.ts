import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ServiceType } from "@shared/schema";

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets a human-readable name for a service type
 */
export function getServiceTypeName(serviceType: ServiceType): string {
  const typeNameMap: Record<ServiceType, string> = {
    ASSISTED_LIVING: "Assisted Living",
    MEMORY_CARE: "Memory Care",
    NURSING_HOME: "Nursing Home",
    INDEPENDENT_LIVING: "Independent Living",
    CCRC: "CCRC",
    ADULT_DAY_CARE: "Adult Day Care",
    HOME_CARE: "Home Care",
    RESPITE_CARE: "Respite Care",
    HOSPICE: "Hospice Care",
    REHABILITATION: "Rehabilitation",
  };

  return typeNameMap[serviceType] || serviceType.replace("_", " ");
}

/**
 * Formats a phone number to a readable format
 */
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === "1") {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Return original if not valid
  return phone;
}

/**
 * Creates a debounced function
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<F>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Extend String prototype for title case conversion
 */
declare global {
  interface String {
    toTitleCase(): string;
  }
}

String.prototype.toTitleCase = function (): string {
  return this.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
};
