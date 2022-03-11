/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 23:31:37
 * @ Modified time: 2022-03-11 09:37:22
 * @ Description:
 */

export interface ProgramDetailResponse {
  data: DetailData;
}

export interface DetailData {
  id: string;
  title: string;
  banner: string;
  description: string;
  value_proposition: string[];
  instructor: Instructor;
  weekdays: string[];
  weightUnit: string;
  weightPlate: string;
  weeks: Week[];
  next:Next;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  tagline: string;
}

export interface Week {
  title: string;
  subTitle: string;
  days: Day[];
}

export interface Day {
  title: string;
  subTitle: string;
  exercisesCount: number;
}

export interface Next {
  week: number;
  day: number;
  title: string;
}

export interface Route {
  key: string;
  name: string;
  params:Params,
}

export interface Params {
  id: string;  
}
