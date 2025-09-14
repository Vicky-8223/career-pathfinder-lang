// College data structure for Jammu & Kashmir
export interface College {
  id: string;
  name: string;
  universityName: string;
  type: 'Government' | 'Private' | 'Affiliated College' | 'Constituent / University College' | 'Recognized Center' | 'PG Center / Off-Campus Center';
  district: string;
  location: string;
  courses?: string[];
  streams?: ('science' | 'commerce' | 'arts')[];
}

// Sample structured college data for J&K based on the uploaded file
export const jammuKashmirColleges: College[] = [
  {
    id: "C-29466",
    name: "College of Engineering",
    universityName: "Shri Mata Vaishno Devi University",
    type: "Constituent / University College",
    district: "Reasi",
    location: "Reasi",
    streams: ["science"],
    courses: ["B.Tech Computer Science", "B.Tech Mechanical", "B.Tech Electronics"]
  },
  {
    id: "C-29467",
    name: "College of Management",
    universityName: "Shri Mata Vaishno Devi University", 
    type: "Constituent / University College",
    district: "Reasi",
    location: "Reasi",
    streams: ["commerce"],
    courses: ["BBA", "MBA", "B.Com"]
  },
  {
    id: "C-29464",
    name: "College of Humanities and Social Sciences",
    universityName: "Shri Mata Vaishno Devi University",
    type: "Constituent / University College", 
    district: "Reasi",
    location: "Reasi",
    streams: ["arts"],
    courses: ["BA Psychology", "BA English", "BA Sociology"]
  },
  {
    id: "C-22936",
    name: "Acharya Sri Chander College of Medical Science & Hospital",
    universityName: "University of Jammu",
    type: "Affiliated College",
    district: "Jammu",
    location: "Jammu",
    streams: ["science"],
    courses: ["MBBS", "BDS", "B.Sc Nursing"]
  },
  {
    id: "C-22940",
    name: "Adarsh College of Computer Sciences & Management Studies",
    universityName: "University of Jammu",
    type: "Affiliated College",
    district: "Samba", 
    location: "Samba",
    streams: ["science", "commerce"],
    courses: ["BCA", "MCA", "BBA", "B.Com"]
  },
  {
    id: "C-30810",
    name: "College of Teacher Education",
    universityName: "Maulana Azad National Urdu University",
    type: "Constituent / University College",
    district: "Srinagar",
    location: "Srinagar",
    streams: ["arts"],
    courses: ["B.Ed", "M.Ed", "D.El.Ed"]
  },
  {
    id: "C-22992",
    name: "Ashoka Law College",
    universityName: "University of Jammu",
    type: "Affiliated College",
    district: "Jammu",
    location: "Jammu",
    streams: ["arts"],
    courses: ["LLB", "LLM", "BA LLB"]
  },
  {
    id: "C-22963",
    name: "Ashoka College of Computer Education",
    universityName: "University of Jammu",
    type: "Affiliated College",
    district: "Kathua",
    location: "Kathua",
    streams: ["science"],
    courses: ["BCA", "MCA", "PGDCA"]
  }
];

// Helper function to filter colleges by stream
export const getCollegesByStream = (stream: 'science' | 'commerce' | 'arts'): College[] => {
  return jammuKashmirColleges.filter(college => 
    college.streams?.includes(stream)
  );
};

// Helper function to get colleges by district
export const getCollegesByDistrict = (district: string): College[] => {
  return jammuKashmirColleges.filter(college => 
    college.district.toLowerCase() === district.toLowerCase()
  );
};

// Get all unique districts
export const getDistricts = (): string[] => {
  return [...new Set(jammuKashmirColleges.map(college => college.district))];
};