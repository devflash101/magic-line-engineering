export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  location: string;
  licenses: string[];
  bio: string;
  tier: "ceo" | "manager" | "member";
}

export const leadershipTeam: TeamMember[] = [
  {
    id: "ceo",
    name: "Raymond",
    role: "CEO",
    image: "/team/manager/CEO.jpg",
    location: "",
    licenses: [],
    bio: "Raymond is the Chief Executive Officer of Magic Line, guiding the firm’s vision across architecture, engineering, and design. He brings a client-focused leadership approach that emphasizes quality, accountability, and long-term partnerships. Raymond works closely with project teams and leadership to ensure every engagement reflects the firm’s standards of excellence from initial concept through successful delivery.",
    tier: "ceo",
  },
  {
    id: "project-manager",
    name: "Jay",
    role: "Project Manager",
    image: "/team/manager/ProjectManager.jpg",
    location: "",
    licenses: [],
    bio: "Jay is the Project Manager at Magic Line, responsible for coordinating timelines, resources, and communication across active projects. He keeps teams aligned, clients informed, and milestones on track from planning through construction support. Jay is known for clear organization, responsive follow-through, and a practical approach that helps complex projects move forward smoothly.",
    tier: "manager",
  },
  {
    id: "financial-manager",
    name: "Salina",
    role: "Financial Manager",
    image: "/team/manager/FinancialManager.jpg",
    location: "",
    licenses: [],
    bio: "Salina is the Financial Manager at Magic Line, overseeing budgeting, financial planning, and operational reporting for the firm. She supports transparent client billing, cost control, and sustainable business operations behind every project. Salina is dedicated to accuracy, consistency, and building the financial foundation that allows the team to deliver with confidence.",
    tier: "manager",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "james-anderson",
    name: "James Anderson",
    role: "Architect",
    image: "/team/james-anderson.png",
    location: "Multi-State",
    licenses: ["Multi-State Licensed Architect"],
    bio: "James Anderson is a multi-licensed architect specializing in residential, commercial, and mixed-use developments. With extensive experience in design, planning, permitting, and construction administration, he helps clients successfully navigate projects across multiple states and jurisdictions. His work is defined by thoughtful design, technical expertise, and a commitment to creating spaces that are functional, sustainable, and enduring.",
    tier: "member",
  },
  {
    id: "frank-gonani",
    name: "Frank Gonani",
    role: "Civil Engineer",
    image: "/team/frank-gonani.png",
    location: "Surprise, AZ",
    licenses: [
      "Civil Engineer — AZ, CO, FL, NM, TX, UT, WY",
      "Consulting Engineer — AZ, FL, OH, TX",
      "Electrical Engineer — AZ, CA, CO, FL, IL, IN, MD, ME, NM, OH, TX, UT, WY",
      "Industrial Engineer — AZ",
      "Traffic Engineer — AZ, CO",
    ],
    bio: "QCK Electric, a trusted subsidiary of Traffic Signal Coordination LLC, delivers high-quality yet cost-effective engineering solutions specializing in electrical, mechanical, and civil design. Our team of licensed Professional Engineers (PEs) is dedicated to accuracy, efficiency, and responsive service — offering expert plan preparation, detailed reviews, PE stamping, and customized consulting.",
    tier: "member",
  },
  {
    id: "sarah-aher",
    name: "Sarah Aher",
    role: "Building Designer",
    image: "/team/sarah-aher.png",
    location: "",
    licenses: ["Interior Design Specialist", "Building Designer"],
    bio: "Sarah Aher is an experienced designer specializing in commercial and residential interior design, building design, and project development. She is known for creating functional, elegant, and client-focused spaces that balance creativity, comfort, and efficiency.",
    tier: "member",
  },
  {
    id: "saady-amin",
    name: "Saady Amin",
    role: "Structural Engineer",
    image: "/team/saady-amin.png",
    location: "Sylvania, OH",
    licenses: [
      "Structural Engineer — AL, CO, DC, DE, FL, GA, ID, IN, KS, KY, LA, MA, MD, MI, MN, MO, NC, NE, NJ, NM, NV, NY, OH, OK, OR, PA, SC, SD, TN, TX, UT, VA, WA, WI, WY",
    ],
    bio: "I am a Structural Engineer based in Sylvania, Ohio with 22 years of experience in the industry. Most of my work is related to commercial construction. I have the necessary toolset and software available at my disposal which will allow me to take on challenging design projects. I am also covered by Professional Liability Insurance for my work.",
    tier: "member",
  },
  {
    id: "sean-green",
    name: "Sean Green",
    role: "Professional Engineer",
    image: "/team/sean-green.png",
    location: "Barberton, OH",
    licenses: [
      "Civil Engineer — DC, FL, GA, IA, KY, MD, MI, MO, NC, NE, OH, SC, VA, WI",
    ],
    bio: "Registered professional engineer in Ohio, Maryland, and Kentucky with 10+ years of civil engineering experience and 6+ years working in the oil and natural gas industry. Specialty services include AutoCAD Civil 3D, Driveway Permits, Right-of-Way Permits, Railroad Crossing Permits, Road Use Maintenance Agreements, and Storm Water Pollution Prevention Plans.",
    tier: "member",
  },
  {
    id: "thomas-johnson",
    name: "Thomas Johnson",
    role: "Professional Engineer",
    image: "/team/thomas-johnson.png",
    location: "Multi-State",
    licenses: ["Multi-State Licensed Professional Engineer"],
    bio: "Thomas Johnson is a multi-state licensed professional engineer with extensive experience in residential and commercial building design, engineering coordination, and municipal approval processes. He provides code-compliant engineering solutions for a variety of project types and works closely with project teams to support permitting, construction documentation, and successful project execution across multiple jurisdictions.",
    tier: "member",
  },
];

export const ceo = leadershipTeam.find((m) => m.tier === "ceo")!;
export const managers = leadershipTeam.filter((m) => m.tier === "manager");
