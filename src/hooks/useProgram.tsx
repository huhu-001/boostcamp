import {useEffect, useState} from 'react';
import {postFetch} from '@/request/index';
import {ProgramResponse,Item} from '@/interfaces/programface';

interface ProgramState {
  data: Item[];
}

export const useProgram = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programState, setProgramState] = useState<ProgramState>({
    data: [],
  });

  // 获取Program列表数据
  const fetchProgramListData = () => {
    postFetch('/coach_program/list', {},()=>null).then((response: ProgramResponse) => {
      setProgramState({
        data: response.data,
      });
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchProgramListData();
  }, []);

  return {
    ...programState,
    isLoading,
  };
};
