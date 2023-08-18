import React from "react";
import Accordion from "../acc";

export default function FAQ() {
  const accordionData = [
    {
      title: "Q. How do I earn points?",
      content:
        "Earn points by participating in club activities and club admin will assign you points",
    },
    {
      title: "Q. What do badges mean?",
      content:
        "Badges are the symbols of milestones you achieved in each club badges are of 4 types: Gold, Silver, Bronze and Core",
    },
    {
      title: "Q. How to get badges?",
      content: `You can get badges on either gathering more points or getting promoted to core`,
    },
    {
      title: "Q. How do I earn medals?",
      content: `Each Season the points you collect are accumulated to pplace you in the global leaderboard and at end of each season according to your rank a medal is assigned to you`,
    },
  ];
  return (
    <div>
      <div className="ml-[25vw] mt-[7vw] text-4xl text-white">
        <div className="mb-[4vh]">Frequently Asked Question</div>
        <div className="accordion">
          {accordionData.map(({ title, content }) => (
            <Accordion title={title} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
}
