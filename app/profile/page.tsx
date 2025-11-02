"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Settings,
  X,
  Plus,
  Upload,
} from "lucide-react";
import type { UserProfile } from "@/types";

// Mock data for demonstration
const mockProfile: UserProfile = {
  id: "1",
  basicInfo: {
    username: "johndoe",
    age: 28,
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    profilePic: "",
  },
  professionalInfo: {
    currentTitle: "Senior Software Engineer",
    currentCompany: "Tech Corp",
    experienceYears: 5,
    industry: "Technology",
  },
  otherInfo: {
    skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL"],
    hobbiesAndInterests: ["Open Source", "Photography", "Hiking"],
    softSkills: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Team Collaboration",
    ],
  },
  education: {
    degree: "Bachelor of Science in Computer Science",
    graduationYear: 2019,
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    university: "Stanford University",
  },
  documents: {
    resume: {
      url: "/resumes/john-doe-resume.pdf",
      fileName: "john-doe-resume.pdf",
      uploadedAt: new Date("2024-10-01"),
    },
  },
  jobPreferences: {
    jobTypes: ["Full Time", "Contract"],
    workModes: ["Remote", "Hybrid"],
    preferredLocations: ["San Francisco, CA", "New York, NY", "Remote"],
    desiredRoles: [
      "Software Engineer",
      "Senior Software Engineer",
      "Tech Lead",
    ],
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleSave = () => {
    // TODO: Save profile to backend
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile({
        ...profile,
        otherInfo: {
          ...profile.otherInfo,
          skills: [...profile.otherInfo.skills, newSkill.trim()],
        },
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        skills: profile.otherInfo.skills.filter((s) => s !== skill),
      },
    });
  };

  const addHobby = () => {
    if (newHobby.trim()) {
      setProfile({
        ...profile,
        otherInfo: {
          ...profile.otherInfo,
          hobbiesAndInterests: [
            ...profile.otherInfo.hobbiesAndInterests,
            newHobby.trim(),
          ],
        },
      });
      setNewHobby("");
    }
  };

  const removeHobby = (hobby: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        hobbiesAndInterests: profile.otherInfo.hobbiesAndInterests.filter(
          (h) => h !== hobby
        ),
      },
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setProfile({
        ...profile,
        otherInfo: {
          ...profile.otherInfo,
          softSkills: [...profile.otherInfo.softSkills, newSoftSkill.trim()],
        },
      });
      setNewSoftSkill("");
    }
  };

  const removeSoftSkill = (skill: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        softSkills: profile.otherInfo.softSkills.filter((s) => s !== skill),
      },
    });
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfile({
        ...profile,
        education: {
          ...profile.education,
          certifications: [
            ...profile.education.certifications,
            newCertification.trim(),
          ],
        },
      });
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setProfile({
      ...profile,
      education: {
        ...profile.education,
        certifications: profile.education.certifications.filter(
          (c) => c !== cert
        ),
      },
    });
  };

  const addPreferredLocation = () => {
    if (newLocation.trim()) {
      setProfile({
        ...profile,
        jobPreferences: {
          ...profile.jobPreferences,
          preferredLocations: [
            ...profile.jobPreferences.preferredLocations,
            newLocation.trim(),
          ],
        },
      });
      setNewLocation("");
    }
  };

  const removePreferredLocation = (location: string) => {
    setProfile({
      ...profile,
      jobPreferences: {
        ...profile.jobPreferences,
        preferredLocations: profile.jobPreferences.preferredLocations.filter(
          (l) => l !== location
        ),
      },
    });
  };

  const addDesiredRole = () => {
    if (newRole.trim()) {
      setProfile({
        ...profile,
        jobPreferences: {
          ...profile.jobPreferences,
          desiredRoles: [
            ...profile.jobPreferences.desiredRoles,
            newRole.trim(),
          ],
        },
      });
      setNewRole("");
    }
  };

  const removeDesiredRole = (role: string) => {
    setProfile({
      ...profile,
      jobPreferences: {
        ...profile.jobPreferences,
        desiredRoles: profile.jobPreferences.desiredRoles.filter(
          (r) => r !== role
        ),
      },
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal and professional information
          </p>
        </div>
        <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          <Settings className="h-4 w-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input
                  value={profile.basicInfo.username}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      basicInfo: {
                        ...profile.basicInfo,
                        username: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  type="number"
                  value={profile.basicInfo.age}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      basicInfo: {
                        ...profile.basicInfo,
                        age: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={profile.basicInfo.email}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      basicInfo: {
                        ...profile.basicInfo,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={profile.basicInfo.location}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      basicInfo: {
                        ...profile.basicInfo,
                        location: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <CardTitle>Professional Information</CardTitle>
            </div>
            <CardDescription>Your work experience and industry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Title</label>
                <Input
                  value={profile.professionalInfo.currentTitle}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      professionalInfo: {
                        ...profile.professionalInfo,
                        currentTitle: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Company</label>
                <Input
                  value={profile.professionalInfo.currentCompany}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      professionalInfo: {
                        ...profile.professionalInfo,
                        currentCompany: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  value={profile.professionalInfo.experienceYears}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      professionalInfo: {
                        ...profile.professionalInfo,
                        experienceYears: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Input
                  value={profile.professionalInfo.industry}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      professionalInfo: {
                        ...profile.professionalInfo,
                        industry: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills and Interests */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Interests</CardTitle>
            <CardDescription>
              Your technical skills, hobbies, and soft skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Technical Skills */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Technical Skills</label>
              <div className="flex flex-wrap gap-2">
                {profile.otherInfo.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeSkill(skill)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Hobbies and Interests */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Hobbies & Interests</label>
              <div className="flex flex-wrap gap-2">
                {profile.otherInfo.hobbiesAndInterests.map((hobby) => (
                  <Badge key={hobby} variant="outline" className="gap-1">
                    {hobby}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeHobby(hobby)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a hobby or interest"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addHobby())
                    }
                  />
                  <Button type="button" onClick={addHobby} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Soft Skills */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Soft Skills</label>
              <div className="flex flex-wrap gap-2">
                {profile.otherInfo.softSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeSoftSkill(skill)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a soft skill"
                    value={newSoftSkill}
                    onChange={(e) => setNewSoftSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSoftSkill())
                    }
                  />
                  <Button type="button" onClick={addSoftSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <CardTitle>Education</CardTitle>
            </div>
            <CardDescription>
              Your educational background and certifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Degree</label>
                <Input
                  value={profile.education.degree}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      education: {
                        ...profile.education,
                        degree: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">University</label>
                <Input
                  value={profile.education.university}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      education: {
                        ...profile.education,
                        university: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Graduation Year</label>
                <Input
                  type="number"
                  value={profile.education.graduationYear}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      education: {
                        ...profile.education,
                        graduationYear: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Certifications</label>
              <div className="flex flex-wrap gap-2">
                {profile.education.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary" className="gap-1">
                    {cert}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeCertification(cert)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a certification"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addCertification())
                    }
                  />
                  <Button type="button" onClick={addCertification} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle>Documents</CardTitle>
            </div>
            <CardDescription>Upload and manage your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.documents.resume ? (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">
                        {profile.documents.resume.fileName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded:{" "}
                        {new Date(
                          profile.documents.resume.uploadedAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Replace
                    </Button>
                  )}
                </div>
              ) : (
                isEditing && (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Upload your resume</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      PDF, DOC, or DOCX (Max 5MB)
                    </p>
                    <Button>Choose File</Button>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Job Preferences</CardTitle>
            <CardDescription>Define your ideal job criteria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Types */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Job Types</label>
              <div className="flex flex-wrap gap-2">
                {["Full Time", "Part Time", "Internship", "Contract"].map(
                  (type) => (
                    <Badge
                      key={type}
                      variant={
                        profile.jobPreferences.jobTypes.includes(type as any)
                          ? "default"
                          : "outline"
                      }
                      className={isEditing ? "cursor-pointer" : ""}
                      onClick={() => {
                        if (isEditing) {
                          const types =
                            profile.jobPreferences.jobTypes.includes(
                              type as any
                            )
                              ? profile.jobPreferences.jobTypes.filter(
                                  (t) => t !== type
                                )
                              : [
                                  ...profile.jobPreferences.jobTypes,
                                  type as any,
                                ];
                          setProfile({
                            ...profile,
                            jobPreferences: {
                              ...profile.jobPreferences,
                              jobTypes: types,
                            },
                          });
                        }
                      }}
                    >
                      {type}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Work Modes */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Work Modes</label>
              <div className="flex flex-wrap gap-2">
                {["Remote", "On-site", "Hybrid"].map((mode) => (
                  <Badge
                    key={mode}
                    variant={
                      profile.jobPreferences.workModes.includes(mode as any)
                        ? "default"
                        : "outline"
                    }
                    className={isEditing ? "cursor-pointer" : ""}
                    onClick={() => {
                      if (isEditing) {
                        const modes = profile.jobPreferences.workModes.includes(
                          mode as any
                        )
                          ? profile.jobPreferences.workModes.filter(
                              (m) => m !== mode
                            )
                          : [...profile.jobPreferences.workModes, mode as any];
                        setProfile({
                          ...profile,
                          jobPreferences: {
                            ...profile.jobPreferences,
                            workModes: modes,
                          },
                        });
                      }
                    }}
                  >
                    {mode}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Preferred Locations */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Preferred Locations</label>
              <div className="flex flex-wrap gap-2">
                {profile.jobPreferences.preferredLocations.map((location) => (
                  <Badge key={location} variant="secondary" className="gap-1">
                    {location}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removePreferredLocation(location)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a preferred location"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addPreferredLocation())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addPreferredLocation}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Desired Roles */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Desired Roles</label>
              <div className="flex flex-wrap gap-2">
                {profile.jobPreferences.desiredRoles.map((role) => (
                  <Badge key={role} variant="secondary" className="gap-1">
                    {role}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeDesiredRole(role)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a desired role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addDesiredRole())
                    }
                  />
                  <Button type="button" onClick={addDesiredRole} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
