import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Pencil, 
  Save, 
  X 
} from "lucide-react";
import { Button } from '../ui/button';
import { Avatar, Input } from '@nextui-org/react';
import ProfileDetailsSection from './ProfileDetailsSection';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Software engineer passionate about building innovative solutions.",
    projects: [
      {
        title: "Portfolio Website",
        description: "A responsive personal portfolio showcasing web development skills.",
        technologies: ["React", "Tailwind", "Next.js"]
      }
    ],
    experience: [
      {
        company: "Tech Innovations Inc.",
        role: "Senior Software Developer",
        duration: "2021 - Present",
        responsibilities: [
          "Lead frontend development",
          "Design system architecture",
          "Mentor junior developers"
        ]
      }
    ],
    skills: [
      {
        name: "React",
        level: "Advanced",
        years: 3,
        description: "Expertise in building scalable web applications"
      }
    ]
  });

  const [editableProfile, setEditableProfile] = useState({ ...userProfile });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset editable profile when canceling edit
    if (isEditing) {
      setEditableProfile({ ...userProfile });
    }
  };

  const handleSaveProfile = () => {
    setUserProfile(editableProfile);
    setIsEditing(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground my-12">
      {/* First Section - Profile Overview */}
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="text-2xl font-bold">Profile Overview</CardTitle>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleEditToggle}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSaveProfile}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleEditToggle}
                  >
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8 p-6">
            {/* Left Side - Avatar & Basic Info */}
            <div className="flex flex-col items-center space-y-6">
            <Avatar
                    isBordered
                    as="button"
                    className="transition-transform hover:scale-105"
                    color="secondary"
                    name="Jason Hughes"
                    size="md"
                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  />
              {!isEditing ? (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                </div>
              ) : null}
            </div>

            {/* Right Side - Editable Details */}
            <div className="space-y-4">
              {!isEditing ? (
                <div className="space-y-2">
                  <p><strong>Phone:</strong> {userProfile.phone}</p>
                  <p><strong>Bio:</strong> {userProfile.bio}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    name="name"
                    label="Full Name"
                    value={editableProfile.name}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    value={editableProfile.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="phone"
                    label="Phone Number"
                    value={editableProfile.phone}
                    onChange={handleInputChange}
                  />
                  <Label>Bio</Label>
                  <textarea
                    name="bio"
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    value={editableProfile.bio}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
          <div>
            <ProfileDetailsSection />
          </div>
     
    </div>
  );
};

export default ProfilePage;