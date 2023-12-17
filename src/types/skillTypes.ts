export type TSingleSkill = {
  data: {
    skill: {
      id: string;
      type: string;
      attributes: {
        name: string;
        type: string;
        importance: number;
        level: number;
      };
      relationships: {
        jobs: { id: string }[];
        skills: { id: string }[];
      };
    };
  };
};

export type TSkillEntity = {
  id: string;
  type: string;
  attributes: {
    name: string;
    type: string;
    importance: number;
    level: number;
  };
  relationships: {
    jobs: string[]; // was {};
    skills: string[]; // was {};
  };
};
