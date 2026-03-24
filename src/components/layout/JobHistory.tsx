import { ReactLenis } from "lenis/react";

import job1 from "@assets/job-history/job-1.webp";
import job2 from "@assets/job-history/job-2.webp";
import job3 from "@assets/job-history/job-3.webp";
import jobFallback from "@assets/placeholders/job-fallback.svg";

const JOBS = [
  {
    id: 1,
    title: "L2 Technical Support Specialist - Payments & Systems",
    company: "NCR Voyix",
    dates: "May 2023 - Present",
    description:
      "Provided advanced technical support and mentorship for L1 agents, resolved escalated payment and system issues, optimized performance using Splunk and XML analysis, created internal tools and guides in HTML/CSS/JavaScript, and collaborated with developers and engineering teams to quickly resolve critical incidents.",
    image: job1,
  },
  {
    id: 2,
    title: "L1 Technical Support Specialist - Payments & Systems",
    company: "NCR Voyix",
    dates: "Dec 2021 - May 2023",
    description:
      "Provided advanced technical support and mentorship for L1 agents, resolved escalated payment and system issues, optimized performance using Splunk and XML analysis, created internal tools and guides in HTML/CSS/JavaScript, and collaborated with developers and engineering teams to quickly resolve critical incidents.",
    image: job2,
  },
  {
    id: 3,
    title: "IT Associate",
    company: "Pan-European University APEIRON",
    dates: "Sep 2020 - Nov 2021",
    description:
      "Managed and improved the university WordPress site with custom CSS/JS, provided technical support to staff and students, maintained student records, supported online learning setups, and contributed to visual content for events.",
    image: job3,
  },
];

export function JobHistory() {
  return (
    <ReactLenis root>
      <section id="job-history" className="job-history-section">
        <div className="job-history-header">
          <span className="job-history-label">Job History</span>
        </div>

        <div className="job-history-stack">
          {JOBS.map((job, index) => (
            <article key={job.id} className="job-history-panel">
              <div
                className="job-history-bg"
                style={{ backgroundImage: `url(${job.image}), url(${jobFallback})` }}
              />

              <div className="job-history-card">
                <div className="job-history-card-top">
                  <div>
                    <p className="job-history-dates">{job.dates}</p>
                    <h3 className="job-history-title">{job.title}</h3>
                    <p className="job-history-company">{job.company}</p>
                  </div>
                  <div className="job-history-index">
                    <span>0{index + 1}</span>
                  </div>
                </div>

                <div className="job-history-divider" />

                <p className="job-history-desc">{job.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ReactLenis>
  );
}
