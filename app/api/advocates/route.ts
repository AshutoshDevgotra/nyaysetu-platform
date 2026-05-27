import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const staticAdvocates = [
  {
    name: "Pooja Patil",
    email: "advocatepoojapatil@gmail.com",
    phone: "+91 98765 43210",
    barRegistrationNumber: "D/1234/2010",
    experience: "12",
    caseTypes: "Family Law, Divorce Cases, Child Custody, Domestic Violence",
    pricePerAppearance: "2500",
    court: "Bombay High Court",
    state: "Maharashtra",
    image: "/Advocates/PoojaPatil.jpeg",
    role: "advocate",
    rating: 4.8,
    casesCount: 320
  },
  {
    name: "Aditya Chauhan",
    email: "fixitaditya@gmail.com",
    phone: "+91 90000 10000",
    barRegistrationNumber: "DL/2020/6789",
    experience: "4",
    caseTypes: "Criminal Law, Cyber Crime, Youth Cases",
    pricePerAppearance: "3000",
    court: "Tis Hazari Court",
    state: "Delhi",
    image: "/Advocates/AdityaChauhan.jpg",
    role: "advocate",
    rating: 4.4,
    casesCount: 85
  },
  {
    name: "Sakshi Baadkar",
    email: "sakshi@bombaybar.in",
    phone: "+91 98888 10001",
    barRegistrationNumber: "MH/2021/4321",
    experience: "3",
    caseTypes: "Family Law, Women Rights, PIL",
    pricePerAppearance: "2500",
    court: "Bombay High Court",
    state: "Maharashtra",
    image: "/Advocates/SakshiBaadkar.jpg",
    role: "advocate",
    rating: 4.2,
    casesCount: 64
  },
  {
    name: "Amish Aggarwala",
    email: "amish@supremecourt.in",
    phone: "+91 98765 00000",
    barRegistrationNumber: "DL/2015/3210",
    experience: "9",
    caseTypes: "Supreme Court, Constitutional Law, Criminal Appeals",
    pricePerAppearance: "20000",
    court: "Supreme Court of India",
    state: "Delhi",
    image: "/Advocates/AmishAggarwala.jpg",
    role: "advocate",
    rating: 4.9,
    casesCount: 450
  },
  {
    name: "Sagar Panghal",
    email: "sagar@scourt.in",
    phone: "+91 95555 11111",
    barRegistrationNumber: "DL/2019/7654",
    experience: "5",
    caseTypes: "Criminal Law, Podcast Legal Reviews, Public Policy",
    pricePerAppearance: "4000",
    court: "Delhi High Court",
    state: "Delhi",
    image: "/Advocates/SagarPanghal.jpg",
    role: "advocate",
    rating: 4.6,
    casesCount: 140
  },
  {
    name: "Vipin Poria",
    email: "vipin@scindia.org",
    phone: "+91 93121 59058",
    barRegistrationNumber: "DL/2010/5566",
    experience: "12",
    caseTypes: "Supreme Court, Constitutional Law, Civil Appeals",
    pricePerAppearance: "12000",
    court: "Supreme Court of India",
    state: "Delhi",
    image: "/Advocates/VipinPoria.jpg",
    role: "advocate",
    rating: 4.7,
    casesCount: 290
  },
  {
    name: "Mandeep Baisla",
    email: "mandeepbaisla@gmail.com",
    phone: "+91 94444 33333",
    barRegistrationNumber: "DL/2012/7788",
    experience: "11",
    caseTypes: "Criminal Law, Bail, Youth Legal Awareness",
    pricePerAppearance: "5000",
    court: "Supreme Court of India",
    state: "Delhi",
    image: "/Advocates/MandeepBaisla.jpg",
    role: "advocate",
    rating: 4.8,
    casesCount: 210
  },
  {
    name: "Kanika Bhardwaj",
    email: "kanika@saketcourt.in",
    phone: "+91 90001 88888",
    barRegistrationNumber: "DL/2016/5432",
    experience: "7",
    caseTypes: "Civil, Matrimonial, Bail, Criminal Law",
    pricePerAppearance: "6000",
    court: "Saket District Court",
    state: "Delhi",
    image: "/Advocates/KanikaBhardwaj.jpg",
    role: "advocate",
    rating: 4.5,
    casesCount: 135
  },
  {
    name: "Ayan Sharma",
    email: "ayan@vakeelsahaaab.in",
    phone: "+91 98761 23456",
    barRegistrationNumber: "DL/2018/9843",
    experience: "6",
    caseTypes: "Criminal Law, Legal Strategy, Civil Disputes",
    pricePerAppearance: "5000",
    court: "Patiala House Court",
    state: "Delhi",
    image: "/Advocates/AyanSharma.jpg",
    role: "advocate",
    rating: 4.5,
    casesCount: 110
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    let advocates = await User.find({ role: "advocate" });
    
    if (advocates.length === 0) {
      console.log("No advocates found in DB. Auto-seeding static advocates...");
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("password123", salt);
      
      const advocatesToInsert = staticAdvocates.map(adv => ({
        ...adv,
        password: hashedPassword
      }));
      
      await User.insertMany(advocatesToInsert);
      advocates = await User.find({ role: "advocate" });
    }
    
    return NextResponse.json(advocates, { status: 200 });
  } catch (error: any) {
    console.error("Fetch advocates API error (falling back to static advocates list):", error);
    const fallbackAdvocates = staticAdvocates.map((adv, i) => ({
      _id: `static-${i}`,
      ...adv
    }));
    return NextResponse.json(fallbackAdvocates, { status: 200 });
  }
}
