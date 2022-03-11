/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 21:15:16
 * @ Modified time: 2022-03-11 09:37:10
 * @ Description:
 */

export interface ProgramResponse {
  data: Item[];
}

export interface Item {
  id: string;
  title: string;
  tagline: string;
  banner?: string;
  difficulty: string;
  equipments: string;
  weekdays: string[];
  weeksCount: number;
  instructor: Instructor;
}

export interface Instructor{
    id: string;
    name: string;
}