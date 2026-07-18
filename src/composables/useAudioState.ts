import { ref } from 'vue';

const isMuted = ref(true);

export const useAudioState = () => {
  const toggleMute = () => {
    isMuted.value = !isMuted.value;
  };

  return {
    isMuted,
    toggleMute,
  };
};
