export type TData = {
  data: {
    jobs: TJob[];
    meta: TMeta;
  };
};

export type TJob = {
  attributes: { title: string };
  id: string;
  relationships: { skills: TSkill[] };
  type: string;
};

export type TSingleJob = {
  data: { job: TJob };
};

type TSkill = {
  id: string;
};

export type TMeta = {
  next: number;
  count: number;
};

export type TJobEntity = {
  id: string;
  title: string;
  skillsId: string[];
  type: string;
};
