import React from "react";
import Accordion from "../acc";

export default function FAQ() {
  const accordionData = [
    {
      title: "Q. When are medals awarded?",
      content:
        "Medals are awarded at the end of each season, which lasts for the length of a semester. The medals are based on the cumulative points earned by users across all clubs. The global leaderboard ranks users based on their total points, reflecting their active participation and contributions to the club community. The top contributors in each season are recognized with medals.",
    },
    {
      title: "Q. How do I earn badges?",
      content: ` Accumulate points in a club to earn badges. Each club has threshold points for bronze, silver, and gold badges. Once you meet a threshold, you receive that badge. Note: Each member can have one badge per club, and promotions update your badge.`,
    },
    {
      title: "Q. How does the global leaderboard and ranking system work?",
      content:
        "The global leaderboard displays the cumulative points earned by users from all clubs throughout the season. This ranking system is used to determine the distribution of medals at the end of each season. It reflects your dedication, engagement, and contributions to the club community.",
    },
    {
      title: "Q. Do points reset after each season?",
      content: `Yes, points reset after each season, and medal is assigned according to the leaderboard rank after each season ends.`,
    },
    {
      title: "Q. How are points allocated to clubs each month?",
      content: `Clubs receive points at the start of each month based on the number of members. Admins distribute these points among members, fostering a fair and inclusive system that rewards active participation.`,
    },
    {
      title: "Q. What if I am not a member of any club?",
      content: `If you are not a member of any club, you can still view other clubs' public posts and polls and their profiles. But you need to join a club if you want to start earning points and badges.`,
    },
    {
      title: "Q.How do I join a club?",
      content: `You can join a club by going to the club's profile and click on the “Apply” button. This will send your request to the club admins. When they accept you application, you become member of that club!`,
    },
    {
      title: "Q. What is a Club Member and what are their permissions?",
      content: `A Club Member is the basic role within a club. As a Club Member, you have the ability to view the club's private posts and polls. You are also eligible to earn points and badges from that club.`,
    },
    {
      title: "Q. What is a Core Member and what are their permissions",
      content: `A Core Member holds a higher position in the hierarchy than a Club Member. In addition to the permissions granted to a Club Member, a Core Member can also add posts and polls to the club. They are awarded a special badge called the Core Badge. Note that each member can have only one badge of a club. If the Core Member role is revoked from someone, their badge is also revoked, and the last badge they had is reassigned to them.`,
    },
    {
      title: "Q. What is a Club Admin and what are their permissions?",
      content: `A Club Admin holds the highest position in the hierarchy within a club. They are responsible for managing the club, assigning points to members, and promoting or demoting members to Core Member or Member status respectively. They also have the ability to remove members from the club. However, it is important to note that removing a member does not mean removing their badge; badge ranks and points are permanent.`,
    },
    {
      title: "Q. Can a club have multiple admins?",
      content: `Each club is led by a single admin with primary authority. Admins have the ability to promote any club member to core status, and core members have the potential to become admins. When a club admin promotes a core member to club admin, that member automatically becomes a core member.`,
    },
  ];
  return (
    <div>
      <div className="ml-[25vw] my-[7vw] text-4xl text-white">
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
