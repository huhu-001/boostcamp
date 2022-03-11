import {useEffect, useState} from 'react';
import {postFetch, getFetch} from '@/request/index';
import {
  ProgramDetailResponse,
  DetailData,
} from '@/interfaces/programfaceDetail';

interface ProgramDetailState {
  data: DetailData;
}

export const useProgramDetail = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [programState, setProgramState] = useState<ProgramDetailState>({
    data: {
      id: '',
      title: '',
      banner: '',
      description: '',
      value_proposition: [],
      instructor: {
        id: '',
        name: '',
        avatar: '',
        tagline: '',
      },
      weekdays: [],
      weightUnit: '',
      weightPlate: '',
      weeks: [],
      next:{
         week: 0,
          day: 0,
          title: '',
      },
    },
  });

  // 获取Program详情数据
  const fetchProgramDetailData = () => {
    postFetch('/coach_program/get', {program_id: id}, () => null).then(
      (response: ProgramDetailResponse) => {
        setProgramState({
          data: response.data,
        });
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    fetchProgramDetailData();
  }, []);

  return {
    ...programState,
    isLoading,
  };
};
