import { useEffect } from 'react'

export default function useBodyScrollLock(lockState) {
    useEffect(() => {
    if (lockState) {
      document.body.style.overflow = 'hidden';
      return;
    } else{
      document.body.style.overflow = 'auto';
    }
  },[lockState])
}