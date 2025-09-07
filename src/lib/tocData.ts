export interface TocItem {
  title: string;
  page: number;
}

export interface TocData {
  [filename: string]: TocItem[];
}

export const tocData: TocData = {
  '250808_농업e지_안내서_기존.pdf': [
    { title: '1. 농업e지 소개', page: 5 },
    { title: '2. 모바일로 간편하게 농업e지 로그인하기', page: 17 },
    { title: '3. PC로 간편하게 농업e지 로그인하기', page: 42 },
    { title: '4. 농업e지 처음 만나기', page: 62 },
    { title: '5. 마이페이지 알아보기', page: 71 },
    { title: '6. 사업신청 알아보기', page: 82 },
    { title: '7. 농식품사업 도우미 알아보기', page: 92 },
    { title: '8. 농식품지도 알아보기', page: 105 },
    { title: '9. 고객센터 알아보기', page: 112 },
    { title: '10. 농업e지는 앞으로 어떻게 달라질까요?', page: 122 }
  ],
  '250814_농업e지_경영체교재_기본.pdf': [
    { title: '1. 농업인 농업경영체 등록신청', page: 4 },
    { title: '2. 농업인 농업경영체 변경 등록신청', page: 16 },
    { title: '3. 농업법인 농업경영체 등록신청', page: 27 },
    { title: '4. 농업법인 농업경영체 변경 등록신청', page: 41 }
  ]
};
