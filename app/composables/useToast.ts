// composables/useToast.ts
export const useToast = () => {
  const showToast = (message: string) => {
    if (import.meta.client) {
      const event = new CustomEvent("show-toast", { detail: message });
      window.dispatchEvent(event);
    }
  };

  return { showToast };
};
