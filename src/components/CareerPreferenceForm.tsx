import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { Input } from '@nextui-org/react';

// Interfaces
interface FormData {
  domain: string;
  customDomain: string;
  careerExpectations: string;
  location: string;
  salarySeniority: string;
  salaryRange: { min: number; max: number };
  education: string;
  specialization: string;
  skills: string;
}

interface FormErrors {
  domain?: string;
  customDomain?: string;
  careerExpectations?: string;
  location?: string;
  salarySeniority?: string;
  education?: string;
  specialization?: string;
  skills?: string;
}

// Constants
const DOMAINS: string[] = [
  "Data Science",
  "Web Development", 
  "Mobile Development",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "AI/ML",
  "Game Development",
];

const SALARY_RANGES = {
  JUNIOR: { min: 30000, max: 70000, label: "Junior Level (0-2 years)" },
  MID_LEVEL: { min: 70000, max: 120000, label: "Mid-Level (2-5 years)" },
  SENIOR: { min: 120000, max: 200000, label: "Senior Level (5-10 years)" },
  EXPERT: { min: 200000, max: 300000, label: "Expert Level (10+ years)" },
};

const EDUCATION_LEVELS: string[] = [
  // "High School",
  "Bachelor's",
  "Master's",
  "PhD",
];

const LOCATION: string[] = [
  "North America",
  "South America", 
  "Europe",
  "Asia Pacific",
  "Middle East",
  "Africa",
  "Remote",
];

const CareerPreferenceForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    domain: "",
    customDomain: "",
    careerExpectations: "",
    location: "",
    salarySeniority: "",
    salaryRange: { min: 30000, max: 70000 },
    education: "",
    specialization: "",
    skills: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormData, value: string | { min: number; max: number }) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDomainChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      domain: value,
      customDomain: value === "Others" ? "" : prev.customDomain,
    }));

    // Clear domain-related errors
    setFormErrors((prev) => {
      const newErrors = {...prev};
      delete newErrors.domain;
      delete newErrors.customDomain;
      return newErrors;
    });
  };

  const handleSalarySeniorityChange = (seniority: keyof typeof SALARY_RANGES) => {
    const range = SALARY_RANGES[seniority];
    setFormData((prev) => ({
      ...prev,
      salarySeniority: seniority,
      salaryRange: { min: range.min, max: range.max },
    }));

    // Clear salary-related errors
    setFormErrors((prev) => {
      const newErrors = {...prev};
      delete newErrors.salarySeniority;
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Validate Domain
    if (!formData.domain) {
      errors.domain = "Domain is required";
    }
    if (formData.domain === "Others" && !formData.customDomain) {
      errors.customDomain = "Custom domain is required";
    }

    // Validate Career Expectations
    if (!formData.careerExpectations.trim()) {
      errors.careerExpectations = "Career expectations are required";
    }

    // Validate Location
    if (!formData.location) {
      errors.location = "Location is required";
    }

    // Validate Salary Seniority
    if (!formData.salarySeniority) {
      errors.salarySeniority = "Salary seniority is required";
    }

    // Validate Education
    if (!formData.education) {
      errors.education = "Education level is required";
    }

    // Validate Specialization
    if (!formData.specialization.trim()) {
      errors.specialization = "Specialization is required";
    }

    // Validate Skills
    if (!formData.skills.trim()) {
      errors.skills = "Skills are required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const submissionData = {
        domain: formData.domain === "Others" ? formData.customDomain : formData.domain,
        careerExpectations: formData.careerExpectations,
        location: formData.location,
        salarySeniority: formData.salarySeniority,
        salaryRange: formData.salaryRange,
        education: formData.education,
        specialization: formData.specialization,
        skills: formData.skills,
      };

      // Store form data in localStorage to persist between pages
      localStorage.setItem('careerPreferenceData', JSON.stringify(submissionData));

      // Navigate to the quiz page
      navigate('/quiz');
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-9" >
      <CardHeader>
        <CardTitle className="text-2xl font-bold ">
          Career Preference Questionnaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Domain Selection */}
          <div className="space-y-2">
            <Label>Select Domain *</Label>
            <Select onValueChange={handleDomainChange} value={formData.domain}>
              <SelectTrigger
                className={formErrors.domain ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Choose a domain" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.domain && (
              <p className="text-destructive text-sm">{formErrors.domain}</p>
            )}

            {/* Conditional Custom Domain Input */}
            {formData.domain === "Others" && (
              <Input
                placeholder="Enter your specific domain"
                value={formData.customDomain}
                onChange={(e) => handleChange("customDomain", e.target.value)}
                className={`mt-2 ${formErrors.customDomain ? "border-destructive" : ""}`}
                required
              />
            )}
            {formErrors.customDomain && (
              <p className="text-destructive text-sm">{formErrors.customDomain}</p>
            )}
          </div>

          {/* Career Expectations */}
          <div className="space-y-2">
            <Label>Career Expectations *</Label>
            <Input
              placeholder="Enter your key career expectations (e.g., High Salary, Remote Work)"
              value={formData.careerExpectations}
              onChange={(e) => handleChange("careerExpectations", e.target.value)}
              className={`w-full ${formErrors.careerExpectations ? "border-destructive" : ""}`}
            />
            {formErrors.careerExpectations && (
              <p className="text-destructive text-sm">{formErrors.careerExpectations}</p>
            )}
          </div>

          {/* Location Preference */}
          <div className="space-y-2">
            <Label>Location Preference *</Label>
            <Select
              onValueChange={(value) => handleChange("location", value)}
              value={formData.location}
            >
              <SelectTrigger className={formErrors.location ? "border-destructive" : ""}>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.location && (
              <p className="text-destructive text-sm">{formErrors.location}</p>
            )}
          </div>

          {/* Salary Expectation */}
          <div className="space-y-2">
            <Label>Salary Expectation *</Label>
            <Select
              onValueChange={(value) =>
                handleSalarySeniorityChange(value as keyof typeof SALARY_RANGES)
              }
              value={formData.salarySeniority}
            >
              <SelectTrigger
                className={formErrors.salarySeniority ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select Career Level" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SALARY_RANGES).map(([key, range]) => (
                  <SelectItem key={key} value={key}>
                    {range.label} (${range.min} - ${range.max})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.salarySeniority && (
              <p className="text-destructive text-sm">
                {formErrors.salarySeniority}
              </p>
            )}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <Label>Education Details *</Label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                onValueChange={(value) => handleChange("education", value)}
                value={formData.education}
              >
                <SelectTrigger className={formErrors.education ? "border-destructive" : ""}>
                  <SelectValue placeholder="Degree Level" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Specialization/Institution"
                value={formData.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
                className={formErrors.specialization ? "border-destructive" : ""}
              />
            </div>
            {formErrors.education && (
              <p className="text-destructive text-sm">{formErrors.education}</p>
            )}
            {formErrors.specialization && (
              <p className="text-destructive text-sm">{formErrors.specialization}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Technological Skills *</Label>
            <Input
              placeholder="Enter your skills (e.g., Python, React, AWS)"
              value={formData.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
              className={formErrors.skills ? "border-destructive" : ""}
            />
            {formErrors.skills && (
              <p className="text-destructive text-sm">{formErrors.skills}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Next <ArrowRight className="ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CareerPreferenceForm;