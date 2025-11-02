"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import type { UserProfile } from "@/types";

interface ProfileEditorProps {
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export default function ProfileEditor({
  initialProfile,
  onSave,
}: ProfileEditorProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleSave = () => {
    onSave(profile);
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

  return {
    profile,
    isEditing,
    setIsEditing,
    handleSave,
    // Skills
    newSkill,
    setNewSkill,
    addSkill,
    removeSkill,
    // Hobbies
    newHobby,
    setNewHobby,
    addHobby,
    removeHobby,
    // Soft Skills
    newSoftSkill,
    setNewSoftSkill,
    addSoftSkill,
    removeSoftSkill,
    // Certifications
    newCertification,
    setNewCertification,
    addCertification,
    removeCertification,
    // Locations
    newLocation,
    setNewLocation,
    addPreferredLocation,
    removePreferredLocation,
    // Roles
    newRole,
    setNewRole,
    addDesiredRole,
    removeDesiredRole,
    // Update functions
    updateBasicInfo: (field: keyof UserProfile["basicInfo"], value: any) => {
      setProfile({
        ...profile,
        basicInfo: { ...profile.basicInfo, [field]: value },
      });
    },
    updateProfessionalInfo: (
      field: keyof UserProfile["professionalInfo"],
      value: any
    ) => {
      setProfile({
        ...profile,
        professionalInfo: { ...profile.professionalInfo, [field]: value },
      });
    },
    updateEducation: (field: keyof UserProfile["education"], value: any) => {
      setProfile({
        ...profile,
        education: { ...profile.education, [field]: value },
      });
    },
    toggleJobType: (type: string) => {
      const types = profile.jobPreferences.jobTypes.includes(type as any)
        ? profile.jobPreferences.jobTypes.filter((t) => t !== type)
        : [...profile.jobPreferences.jobTypes, type as any];
      setProfile({
        ...profile,
        jobPreferences: { ...profile.jobPreferences, jobTypes: types },
      });
    },
    toggleWorkMode: (mode: string) => {
      const modes = profile.jobPreferences.workModes.includes(mode as any)
        ? profile.jobPreferences.workModes.filter((m) => m !== mode)
        : [...profile.jobPreferences.workModes, mode as any];
      setProfile({
        ...profile,
        jobPreferences: { ...profile.jobPreferences, workModes: modes },
      });
    },
  };
}
