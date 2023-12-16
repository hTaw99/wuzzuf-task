import { useEffect, useState } from "react";

export function useIntersectionOvserver({ jobs, meta }) {
  const [limit, setLimit] = useState(12);
  const [cursor, setCursor] = useState(0);
  const [observedJob, setObservedJob] = useState("");

  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    const id = jobs[jobs.length - 1].id;
    if (id !== observedJob) {
      setObservedJob(id);
      observeElement(document.getElementById(id));
    }
  }, [jobs]);

  const observeElement = (element) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          if (meta.next) {
            setLimit((perv) => {
              if (meta.count - meta.next > 12) {
                return 12;
              } else {
                return meta.count - meta.next;
              }
            });
            setCursor(meta.next);
          }
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return { limit, cursor };
}
