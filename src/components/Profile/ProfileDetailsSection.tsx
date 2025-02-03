import React, { useState, FC } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, X, Plus } from "lucide-react";

// Type Definitions
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

interface Skill {
  id: string;
  name: string;
  level: string;
  description: string;
}

interface UserProfile {
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
}

const ProfileDetailsSection: FC = () => {
  const [activeSection, setActiveSection] = useState<'projects' | 'experience' | 'skills'>('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    projects: [
      {
        id: 'proj1',
        title: 'Advanced Portfolio Tracker',
        description: 'Machine learning powered investment insights platform',
        technologies: ['React', 'TensorFlow', 'Node.js']
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'Tech Innovations Inc.',
        role: 'Senior Software Architect',
        duration: '2020 - Present',
        responsibilities: [
          'Microservices architecture design',
          'Team leadership',
          'Technology strategy'
        ]
      }
    ],
    skills: [
      {
        id: 'skill1',
        name: 'Full Stack Development',
        level: 'Expert',
        description: 'Comprehensive web development expertise'
      }
    ]
  });

  const renderProjectSection = () => {
    return (
      <div className="space-y-4">
        {userProfile.projects.map((project) => (
          <Card key={project.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>{project.title}</CardTitle>
              {isEditing && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {isEditing && (
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Button>
        )}
      </div>
    );
  };

  const renderExperienceSection = () => {
    return (
      <div className="space-y-4">
        {userProfile.experience.map((exp) => (
          <Card key={exp.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>{exp.role}</CardTitle>
                <p className="text-muted-foreground">{exp.company}</p>
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{exp.duration}</p>
              <ul className="list-disc list-inside mt-2">
                {exp.responsibilities.map((resp, index) => (
                  <li key={index} className="text-sm">{resp}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
        {isEditing && (
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add New Experience
          </Button>
        )}
      </div>
    );
  };

  const renderSkillsSection = () => {
    return (
      <div className="space-y-4">
        {userProfile.skills.map((skill) => (
          <Card key={skill.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>{skill.name}</CardTitle>
                <p className="text-muted-foreground">{skill.level}</p>
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <p>{skill.description}</p>
            </CardContent>
          </Card>
        ))}
        {isEditing && (
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add New Skill
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center border-b">
          <div className="flex space-x-2">
            {['projects', 'experience', 'skills'].map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? 'default' : 'ghost'}
                onClick={() => setActiveSection(section as 'projects' | 'experience' | 'skills')}
                className="capitalize"
              >
                {section}
              </Button>
            ))}
          </div>
          <Button 
            variant={isEditing ? 'destructive' : 'outline'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Section'}
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {activeSection === 'projects' && renderProjectSection()}
          {activeSection === 'experience' && renderExperienceSection()}
          {activeSection === 'skills' && renderSkillsSection()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetailsSection;