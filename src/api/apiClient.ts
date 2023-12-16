import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchAllJobs, selectAllJobs } from "@/store/features/jobsEntitySlice";
import { useEffect } from "react";

const baseUrl = "https://skills-api-zeta.vercel.app";

export const getAllJobs = async <T>({
  limit = 12,
  cursor = 0,
}: {
  limit: number;
  cursor: number;
}) => {
  const response = await fetch(
    `${baseUrl}/jobs?cursor=${cursor}&limit=${limit}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Somtheng went wrong");
  }

  const data: T = await response.json();
  return data;
};

export const getAllJobs2 = async () => {
  const response = await fetch(`${baseUrl}/jobs?limit=32`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Somtheng went wrong");
  }

  const data = await response.json();
  return data;
};

export const getSearchedJobs = async (query: string) => {
  const response = await fetch(`${baseUrl}/jobs/search?query=${query}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Somtheng went wrong");
  }

  const data = await response.json();
  return data;
};

export const getSkill = async (id: string) => {
  const response = await fetch(`${baseUrl}/skill/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Somtheng went wrong");
  }

  const data = await response.json();
  return data;
};

export const getSkillsByIds = async (skillsId: string[]) => {
  const skills = Promise.all(
    skillsId.map(async (id) => {
      const response = await fetch(`${baseUrl}/skill/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    })
  );
  const arr = await skills;

  return arr;

  // if (!response.ok) {
  //   throw new Error("Somtheng went wrong");
  // }

  // const data = await response.json();
  // return data;
};

export const getJobsByIds = async (jobsId: string[]) => {
  const jobs = Promise.all(
    jobsId.map(async (id) => {
      const response = await fetch(`${baseUrl}/job/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    })
  );
  const arr = await jobs;

  return arr;

  // if (!response.ok) {
  //   throw new Error("Somtheng went wrong");
  // }

  // const data = await response.json();
  // return data;
};

export const getSingleJob = async (id: string) => {
  const response = await fetch(`${baseUrl}/job/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Somtheng went wrong");
  }

  const data = await response.json();
  return data;
};

export const useGetAllJobs = () => {
  const jobs = useAppSelector(selectAllJobs);
  const { statusForAllJobs } = useAppSelector((state) => state.jobsEntity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (statusForAllJobs === "idle") {
      dispatch(fetchAllJobs());
    }
  }, [statusForAllJobs]);

  return { jobs, statusForAllJobs };
};
