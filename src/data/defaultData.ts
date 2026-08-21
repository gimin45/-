import { Project, ExperienceItem, HowIWorkStep, SiteConfig, WorkshopGraphic, ResumeData } from '../types';
import profilePhotoImg from '../assets/images/profile_photo_1787246932511.jpg';

// High-quality custom stylized SVGs for realistic sports marketing placeholders
export const SVG_PLACEHOLDERS = {
  // WBC 2026/2023 airplane seating dilemma content
  wbcSeatContent: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#090d16"/>
        </linearGradient>
        <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1350" fill="url(#bgGrad)"/>
      <rect x="50" y="50" width="980" height="1250" rx="24" fill="none" stroke="#334155" stroke-width="2"/>
      
      <!-- Header Badge -->
      <rect x="90" y="100" width="280" height="46" rx="8" fill="#1e3a8a"/>
      <text x="115" y="130" fill="#93c5fd" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" letter-spacing="2">ILGAN SPORTS FIELD CLUB</text>
      
      <text x="90" y="220" fill="#f8fafc" font-family="'Outfit', sans-serif" font-weight="900" font-size="58">WBC 대표팀 전세기 좌석표</text>
      <text x="90" y="280" fill="#38bdf8" font-family="'Outfit', sans-serif" font-weight="800" font-size="40">"당신이 앉고 싶은 단 하나의 자리는?"</text>
      <text x="90" y="325" fill="#94a3b8" font-family="sans-serif" font-size="22">팬 참여형 인터랙티브 가상 좌석 배치도 콘텐츠</text>

      <!-- Viral Metric Tag -->
      <g transform="translate(680, 100)">
        <rect width="310" height="60" rx="30" fill="#07732C" stroke="#4ade80" stroke-width="1.5"/>
        <circle cx="30" cy="30" r="10" fill="#4ade80"/>
        <text x="55" y="37" fill="#ffffff" font-family="'Pretendard', sans-serif" font-weight="800" font-size="22">327,742 VIEWS</text>
      </g>

      <!-- Airplane Cabin Grid Layout Graphic -->
      <rect x="90" y="370" width="900" height="800" rx="20" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      
      <!-- Row 1 -->
      <g transform="translate(130, 420)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
        <text x="20" y="45" fill="#60a5fa" font-weight="800" font-size="20">SEAT 1A</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">이정후</text>
        <text x="20" y="118" fill="#94a3b8" font-size="16">끝없는 메이저 타격 토론</text>
      </g>
      <g transform="translate(420, 420)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="45" fill="#94a3b8" font-weight="800" font-size="20">SEAT 1B</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">김광현</text>
        <text x="20" y="118" fill="#94a3b8" font-size="16">국대 15년 썰 풀이</text>
      </g>
      <g transform="translate(710, 420)">
        <rect width="240" height="150" rx="14" fill="#07732C" stroke="#4ade80" stroke-width="2"/>
        <text x="20" y="45" fill="#86efac" font-weight="800" font-size="20">SEAT 1C (HOT)</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">양의지</text>
        <text x="20" y="118" fill="#dcfce7" font-size="16">말없이 간식 무한 나눔</text>
      </g>

      <!-- Row 2 -->
      <g transform="translate(130, 600)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="45" fill="#94a3b8" font-weight="800" font-size="20">SEAT 2A</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">고우석</text>
        <text x="20" y="118" fill="#94a3b8" font-size="16">비행 내내 악력기 운동</text>
      </g>
      <g transform="translate(420, 600)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
        <text x="20" y="45" fill="#fcd34d" font-weight="800" font-size="20">SEAT 2B (MY SEAT?)</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">빈자리 [선택]</text>
        <text x="20" y="118" fill="#fde68a" font-size="16">당신의 좌석 번호는?</text>
      </g>
      <g transform="translate(710, 600)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="45" fill="#94a3b8" font-weight="800" font-size="20">SEAT 2C</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">김하성</text>
        <text x="20" y="118" fill="#94a3b8" font-size="16">골드글러브 수비 강의</text>
      </g>

      <!-- Row 3 -->
      <g transform="translate(130, 780)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="45" fill="#94a3b8" font-weight="800" font-size="20">SEAT 3A</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">박병호</text>
        <text x="20" y="118" fill="#94a3b8" font-size="16">홈런 비거리 특강</text>
      </g>
      <g transform="translate(420, 780)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="45" fill="#94a3b8" font-weight="800" font-size="20">SEAT 3B</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">원태인</text>
        <text x="20" y="118" fill="#94a3b8" font-size="16">체인지업 그립 과외</text>
      </g>
      <g transform="translate(710, 780)">
        <rect width="240" height="150" rx="14" fill="#0f172a" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="45" fill="#94a3b8" font-weight="800" font-size="20">SEAT 3C</text>
        <text x="20" y="85" fill="#ffffff" font-weight="900" font-size="28">강백호</text>
        <text x="20" y="118" fill="#94a3b8" font-size="16">에너지 200% 응원가</text>
      </g>

      <!-- Bottom Interactive Bar -->
      <g transform="translate(130, 960)">
        <rect width="820" height="160" rx="16" fill="#090d16" stroke="#2563eb" stroke-width="1.5"/>
        <text x="40" y="55" fill="#38bdf8" font-weight="800" font-size="24">📊 실시간 팬 반응 요약</text>
        <text x="40" y="100" fill="#e2e8f0" font-size="20">"1C 양의지 옆자리 압도적 1위" · "댓글 1,770개 폭발적 토론 발생"</text>
        <text x="40" y="130" fill="#94a3b8" font-size="16">콘텐츠 기획 및 비주얼 디자인 : 홍기민</text>
      </g>

      <!-- Footer Bar -->
      <text x="90" y="1230" fill="#64748b" font-size="20">일간스포츠 공식 SNS 발행 | 기획 · 카피 · 비주얼 디자인 · 데이터 분석</text>
    </svg>
  `)}`,

  // Baseball Workshop #7 Infographic Placeholder
  workshop07: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="100%" height="100%">
      <rect width="1080" height="1080" fill="#0d1117"/>
      <rect x="40" y="40" width="1000" height="1000" rx="16" fill="#161b22" stroke="#30363d" stroke-width="2"/>
      
      <!-- Top Title -->
      <rect x="80" y="80" width="220" height="40" rx="6" fill="#238636"/>
      <text x="100" y="107" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="18">야구공작소 07번 대표작</text>
      <text x="80" y="170" fill="#ffffff" font-family="'Outfit', sans-serif" font-weight="900" font-size="44">투수 릴리스 포인트 & 무브먼트 비교</text>
      <text x="80" y="215" fill="#8b949e" font-size="20">복잡한 트랙맨 세부 지표의 직관적 시각화</text>
      
      <!-- Pitch Chart Matrix -->
      <rect x="80" y="260" width="920" height="660" rx="12" fill="#0d1117" stroke="#30363d"/>
      
      <!-- Strike Zone grid -->
      <line x1="540" y1="290" x2="540" y2="880" stroke="#21262d" stroke-width="2"/>
      <line x1="120" y1="585" x2="960" y2="585" stroke="#21262d" stroke-width="2"/>
      
      <!-- Strike zone box -->
      <rect x="360" y="420" width="360" height="340" fill="#1f2937" fill-opacity="0.4" stroke="#e6edf3" stroke-width="3"/>
      
      <!-- Pitch Trajectories -->
      <!-- Fastball (Red) -->
      <circle cx="440" cy="480" r="18" fill="#ef4444"/>
      <text x="470" y="488" fill="#fca5a5" font-weight="700" font-size="18">Four-Seam (152km/h)</text>
      
      <!-- Slider (Blue) -->
      <circle cx="660" cy="690" r="18" fill="#3b82f6"/>
      <text x="690" y="698" fill="#93c5fd" font-weight="700" font-size="18">Sweeper (138km/h)</text>
      
      <!-- Splitter (Green) -->
      <circle cx="510" cy="740" r="18" fill="#10b981"/>
      <text x="320" y="748" fill="#6ee7b7" font-weight="700" font-size="18">Fork / Splitter</text>

      <g transform="translate(110, 800)">
        <rect width="860" height="90" rx="8" fill="#161b22" stroke="#238636" stroke-width="1"/>
        <text x="30" y="38" fill="#58a6ff" font-weight="700" font-size="20">💡 Information Hierarchy Strategy</text>
        <text x="30" y="68" fill="#c9d1d9" font-size="16">원문 칼럼의 12개 수치 지표 중 결정적 3개 변수(수직 무브먼트, 릴리스 높이, 피안타율)로 압축 재설계</text>
      </g>
      
      <text x="80" y="975" fill="#8b949e" font-size="18">야구공작소 미디어팀 | 인포그래픽 · 에디토리얼 디자인 · 칼럼 재구성</text>
    </svg>
  `)}`,

  // Fanpage todaybluewave
  fanpageCover: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="100%" height="100%">
      <rect width="1080" height="1080" fill="#0b1b3d"/>
      <circle cx="900" cy="180" r="250" fill="#1d4ed8" fill-opacity="0.3"/>
      <circle cx="150" cy="900" r="350" fill="#0284c7" fill-opacity="0.2"/>
      
      <!-- Frame -->
      <rect x="50" y="50" width="980" height="980" rx="20" fill="none" stroke="#1e40af" stroke-width="2"/>
      
      <text x="100" y="140" fill="#60a5fa" font-weight="800" font-size="22" letter-spacing="3">OWNED MEDIA & SNS OPERATION</text>
      <text x="100" y="220" fill="#ffffff" font-family="'Outfit', sans-serif" font-weight="900" font-size="52">todaybluewave / ONLIONS KBO</text>
      <text x="100" y="270" fill="#93c5fd" font-size="24">1인 기획 · 제작 · 발행 및 실시간 인사이트 트래킹</text>

      <!-- KPI Metrics Card -->
      <g transform="translate(100, 320)">
        <rect width="880" height="200" rx="16" fill="#172554" stroke="#2563eb" stroke-width="1.5"/>
        
        <g transform="translate(50, 45)">
          <text x="0" y="45" fill="#ffffff" font-weight="900" font-size="48">5,456</text>
          <text x="0" y="85" fill="#93c5fd" font-size="18">최고 단일 게시물 조회수</text>
        </g>
        <line x1="300" y1="30" x2="300" y2="160" stroke="#1e40af" stroke-width="1.5"/>
        
        <g transform="translate(340, 45)">
          <text x="0" y="45" fill="#ffffff" font-weight="900" font-size="48">3,729</text>
          <text x="0" y="85" fill="#93c5fd" font-size="18">대표팀 포토 콘텐츠 도달</text>
        </g>
        <line x1="590" y1="30" x2="590" y2="160" stroke="#1e40af" stroke-width="1.5"/>
        
        <g transform="translate(630, 45)">
          <text x="0" y="45" fill="#38bdf8" font-weight="900" font-size="48">100%</text>
          <text x="0" y="85" fill="#93c5fd" font-size="18">당일 이슈 즉시 제작 & 발행</text>
        </g>
      </g>

      <!-- Instagram Feed Mockup -->
      <g transform="translate(100, 560)">
        <rect width="420" height="400" rx="14" fill="#0f172a" stroke="#334155"/>
        <rect x="25" y="25" width="370" height="240" rx="8" fill="#1e3a8a"/>
        <text x="45" y="145" fill="#ffffff" font-weight="800" font-size="28">MATCH DAY RECAP</text>
        <text x="45" y="185" fill="#93c5fd" font-size="18">블루웨이브 실시간 경기 총평</text>
        <text x="25" y="310" fill="#f8fafc" font-size="16">❤️ 31  💬 18  ✈️ 13  🔖 42</text>
        <text x="25" y="350" fill="#94a3b8" font-size="14">이슈형/대담형/디자인형 포맷 다변화</text>
      </g>

      <g transform="translate(560, 560)">
        <rect width="420" height="400" rx="14" fill="#0f172a" stroke="#334155"/>
        <rect x="25" y="25" width="370" height="240" rx="8" fill="#0369a1"/>
        <text x="45" y="145" fill="#ffffff" font-weight="800" font-size="28">INSIGHT DATA LOG</text>
        <text x="45" y="185" fill="#bae6fd" font-size="18">게시물별 성과 피드백 아카이브</text>
        <text x="25" y="310" fill="#f8fafc" font-size="16">도달률 vs 반응률 상관관계 분석</text>
        <text x="25" y="350" fill="#94a3b8" font-size="14">팬 참여 유도 카피 A/B 테스트</text>
      </g>
    </svg>
  `)}`,

  // OLDBOYS
  oldboysCover: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="100%" height="100%">
      <rect width="1080" height="1080" fill="#1c1917"/>
      <rect x="50" y="50" width="980" height="980" rx="20" fill="#292524" stroke="#44403c" stroke-width="2"/>
      
      <text x="100" y="140" fill="#f97316" font-weight="800" font-size="22" letter-spacing="3">FAN ENGAGEMENT & FIELD OPERATION</text>
      <text x="100" y="220" fill="#fafaf9" font-family="'Outfit', sans-serif" font-weight="900" font-size="56">OLDBOYS 야구 동아리 회장</text>
      <text x="100" y="270" fill="#d6d3d1" font-size="24">기획에 그치지 않고 사람을 실제로 움직이게 만든 경험</text>

      <g transform="translate(100, 320)">
        <rect width="880" height="180" rx="14" fill="#1c1917" stroke="#78716c" stroke-width="1"/>
        <g transform="translate(60, 45)">
          <text x="0" y="45" fill="#ea580c" font-weight="900" font-size="52">70+</text>
          <text x="0" y="85" fill="#a8a29e" font-size="18">활동 부원 총괄 규모</text>
        </g>
        <line x1="280" y1="25" x2="280" y2="155" stroke="#44403c"/>
        <g transform="translate(340, 45)">
          <text x="0" y="45" fill="#ffffff" font-weight="900" font-size="52">30 / 30</text>
          <text x="0" y="85" fill="#a8a29e" font-size="18">1차 직관 전원 인증 참여</text>
        </g>
        <line x1="580" y1="25" x2="580" y2="155" stroke="#44403c"/>
        <g transform="translate(640, 45)">
          <text x="0" y="45" fill="#ffffff" font-weight="900" font-size="52">20 / 20</text>
          <text x="0" y="85" fill="#a8a29e" font-size="18">2차 직관 전원 이벤트 완주</text>
        </g>
      </g>

      <!-- Event Posters Visual -->
      <g transform="translate(100, 540)">
        <rect width="420" height="420" rx="12" fill="#0c0a09" stroke="#ea580c" stroke-width="2"/>
        <text x="30" y="60" fill="#fdba74" font-weight="800" font-size="22">STADIUM EVENT POSTER</text>
        <text x="30" y="100" fill="#fafaf9" font-weight="900" font-size="28">직관 인증 & 현장 미션</text>
        <rect x="30" y="130" width="360" height="210" rx="8" fill="#431407"/>
        <text x="50" y="240" fill="#ffedd5" font-weight="800" font-size="24">선수 응원가 릴레이 챌린지</text>
        <text x="30" y="380" fill="#a8a29e" font-size="16">실제 홍보물 및 가이드라인 사전 배포</text>
      </g>

      <g transform="translate(560, 540)">
        <rect width="420" height="420" rx="12" fill="#0c0a09" stroke="#57534e"/>
        <text x="30" y="60" fill="#a8a29e" font-weight="800" font-size="22">PHOTO CONTEST</text>
        <text x="30" y="100" fill="#fafaf9" font-weight="900" font-size="28">야구장 사진 공모전 기획</text>
        <rect x="30" y="130" width="360" height="210" rx="8" fill="#1c1917"/>
        <text x="50" y="240" fill="#e7e5e4" font-weight="800" font-size="24">순간 포착 & 팬 스토리텔링</text>
        <text x="30" y="380" fill="#a8a29e" font-size="16">단순 관람을 '공동의 추억 아카이브'로 확장</text>
      </g>
    </svg>
  `)}`,

  // adidas Training Proposal
  adidasCover: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="100%" height="100%">
      <rect width="1080" height="1080" fill="#09090b"/>
      <rect x="50" y="50" width="980" height="980" rx="20" fill="#18181b" stroke="#27272a" stroke-width="2"/>
      
      <text x="100" y="140" fill="#e4e4e7" font-weight="800" font-size="22" letter-spacing="3">MARKETING STRATEGY & PROPOSAL</text>
      <text x="100" y="220" fill="#ffffff" font-family="'Outfit', sans-serif" font-weight="900" font-size="52">adidas Training Proposal</text>
      <text x="100" y="270" fill="#a1a1aa" font-size="24">트레이닝 카테고리 확장 전략 및 프레젠테이션</text>

      <!-- Key Badge Grid -->
      <g transform="translate(100, 320)">
        <rect width="880" height="140" rx="12" fill="#09090b" stroke="#3f3f46"/>
        <g transform="translate(50, 40)">
          <text x="0" y="35" fill="#ffffff" font-weight="900" font-size="36">FINAL 4TH</text>
          <text x="0" y="65" fill="#a1a1aa" font-size="16">최종 4위 선정 성과</text>
        </g>
        <line x1="280" y1="20" x2="280" y2="120" stroke="#27272a"/>
        <g transform="translate(340, 40)">
          <text x="0" y="35" fill="#ffffff" font-weight="900" font-size="36">3C ANALYSIS</text>
          <text x="0" y="65" fill="#a1a1aa" font-size="16">시장·소비자·경쟁사 입체 분석</text>
        </g>
        <line x1="580" y1="20" x2="580" y2="120" stroke="#27272a"/>
        <g transform="translate(640, 40)">
          <text x="0" y="35" fill="#ffffff" font-weight="900" font-size="36">PITCH DECK</text>
          <text x="0" y="65" fill="#a1a1aa" font-size="16">고밀도 발표자료 직접 구현</text>
        </g>
      </g>

      <!-- Slide Deck Structure Diagram -->
      <g transform="translate(100, 500)">
        <rect width="880" height="460" rx="16" fill="#09090b" stroke="#27272a"/>
        <text x="40" y="60" fill="#fafafa" font-weight="800" font-size="24">STRATEGIC PROPOSAL FLOW</text>
        
        <!-- Pillar 1 -->
        <g transform="translate(40, 100)">
          <rect width="250" height="300" rx="10" fill="#18181b" stroke="#3f3f46"/>
          <text x="25" y="45" fill="#d4d4d8" font-weight="800" font-size="20">01 MARKET CONTEXT</text>
          <text x="25" y="85" fill="#ffffff" font-weight="700" font-size="18">러닝 열풍 속 트레이닝의 재발견</text>
          <text x="25" y="130" fill="#71717a" font-size="14">체력 증진 및 부상 방지 목적의 보강 트레이닝 시장 성장세 포착</text>
        </g>
        
        <!-- Pillar 2 -->
        <g transform="translate(315, 100)">
          <rect width="250" height="300" rx="10" fill="#18181b" stroke="#3f3f46"/>
          <text x="25" y="45" fill="#d4d4d8" font-weight="800" font-size="20">02 TARGET PERSONA</text>
          <text x="25" y="85" fill="#ffffff" font-weight="700" font-size="18">하이브리드 운동 러버</text>
          <text x="25" y="130" fill="#71717a" font-size="14">러닝과 짐 트레이닝을 병행하는 2030 영 스포츠 세대 심층 타깃팅</text>
        </g>
        
        <!-- Pillar 3 -->
        <g transform="translate(590, 100)">
          <rect width="250" height="300" rx="10" fill="#18181b" stroke="#3f3f46"/>
          <text x="25" y="45" fill="#d4d4d8" font-weight="800" font-size="20">03 ACTIVATION</text>
          <text x="25" y="85" fill="#ffffff" font-weight="700" font-size="18">온·오프라인 챌린지</text>
          <text x="25" y="130" fill="#71717a" font-size="14">제품 체험 및 SNS 러닝 크루 연계 트레이닝 세션 운영안 도출</text>
        </g>
      </g>
    </svg>
  `)}`,
};

export const DEFAULT_WORKSHOP_GRAPHICS: WorkshopGraphic[] = [
  {
    num: 1,
    title: "대표작 : 투수 릴리스 포인트 & 무브먼트 비교",
    category: "Pitch Trajectory & Metrics",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "원문 칼럼의 12개 수치 지표 중 결정적 3개 변수로 압축 재설계한 대표 인포그래픽",
  },
  {
    num: 2,
    title: "KBO 타자 핫앤콜드 존 & 타구 속도 분포",
    category: "Batting Hot/Cold Zone",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "구장별 타구 비거리 및 발사각 상관관계를 팬 관점에서 재구성한 카드뉴스",
  },
  {
    num: 3,
    title: "수비 시프트 전후 안타 확률 변화 인포그래픽",
    category: "Defensive Shift Probability",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "복잡한 수비 지표 UZR/DRS 데이터를 컬러 그라디언트 맵으로 단순화",
  },
  {
    num: 4,
    title: "불펜 투수 연투 위험도 및 구속 저하 상관관계",
    category: "Bullpen Fatigue Index",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "등판 간격에 따른 회전수 및 무브먼트 변화를 칼럼 썸네일로 구현",
  },
  {
    num: 5,
    title: "포수 프레이밍 득점 기여도(RAA) 랭킹 시각화",
    category: "Catcher Framing Value",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "스트라이크 판정 경계선 콜 성공률을 직관적인 3분할 게이지로 표현",
  },
  {
    num: 6,
    title: "좌우 스플릿 및 득점권 상황별 타격 어프로치",
    category: "Clutch Hit Split",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "볼카운트별 스윙률과 컨택률을 레이더 차트 스타일로 디자인",
  },
  {
    num: 7,
    title: "KBO 리그 평균자책점과 FIP 괴리 분석",
    category: "Sabermetrics Editorial",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "수비 무관 평균자책점의 이론적 배경을 흥미로운 스토리텔링 포스터로 편집",
  },
  {
    num: 8,
    title: "유망주 성장 트랙 및 WAR 누적 예측 모델",
    category: "Prospect Projection",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "동나이대 역대 레전드 선수들과의 성장 곡선 궤적 오버레이",
  },
  {
    num: 9,
    title: "메이저리그 진출 타자의 패스트볼 대처 능력",
    category: "MLB Fastball Handling",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "95마일 이상 강속구 타율 및 헛스윙률을 인포그래픽으로 비교",
  },
  {
    num: 10,
    title: "구종별 헛스윙 유도율(Whiff%) 매트릭스",
    category: "Pitch Arsenal Breakdown",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "슬라이더 vs 체인지업 결정구 완성도를 팬이 쉽게 비교할 수 있도록 배치",
  },
  {
    num: 11,
    title: "연장 승부치기 번트 작전의 기대 득점 효율성",
    category: "Extra Inning Strategy",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "노아웃 2루 상황 번트 vs 강공 선택 시 승리 확률 시뮬레이션",
  },
  {
    num: 12,
    title: "주루 속도(Sprint Speed)와 도루 성공률의 상관관계",
    category: "Baserunning & Speed",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "초속/순간 가속도 데이터와 리드 폭의 관계를 시각적 트랙으로 구성",
  },
  {
    num: 13,
    title: "포스트시즌 단기전 선발 투수 투구수 관리 데이터",
    category: "Postseason Pitch Count",
    url: SVG_PLACEHOLDERS.workshop07,
    description: "타순 3바퀴째 피OPS 급증 현상을 타임라인 바 차트로 정리",
  },
];

export const WORKSHOP_FIXED_ORDER = [7, 11, 3, 1, 2, 4, 13, 8, 5, 9, 10, 6, 12];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'fieldclub',
    order: '01',
    title: '일간스포츠 필드클럽',
    category: 'CONTENT · SOCIAL · FIELD',
    coverImage: SVG_PLACEHOLDERS.wbcSeatContent,
    summary: '공식 채널용 스포츠 콘텐츠를 기획·제작하고, 현장 취재와 숏폼·인터뷰까지 확장했습니다.',
    metrics: [
      { value: '327,742', label: 'WBC 카드뉴스 조회수' },
      { value: '7,181', label: '동일 콘텐츠 공유' },
      { value: '6,466', label: '동일 콘텐츠 좋아요' },
      { value: '1,770', label: '동일 콘텐츠 댓글' },
    ],
    context: '공식 스포츠 미디어 채널에서는 정보 전달만으로 끝나는 콘텐츠보다, 팬이 즉시 선택하고 의견을 남길 수 있는 참여 구조가 중요하다고 판단했습니다.',
    role: '콘텐츠 소재 발굴, 카피 기획, 카드뉴스·포스터 디자인, 현장 콘텐츠 제작에 참여했습니다.',
    strategy: '선수 정보를 나열하는 대신 ‘WBC로 가는 비행기에서 누구 옆에 앉을 것인가?’라는 선택형 질문으로 재구성해 정보와 놀이를 결합했습니다.',
    result: '대표 WBC 좌석 콘텐츠는 조회수 327,742회, 공유 7,181회, 좋아요 6,466회, 댓글 1,770회를 기록했습니다.',
    takeaway: '공식 미디어의 신뢰감과 팬 커뮤니티의 능동적 놀이 문화를 결합했을 때 유기적 도달과 자발적 공유가 폭발한다는 것을 숫자로 증명했습니다.',
    images: [
      {
        id: 'fc-1',
        url: SVG_PLACEHOLDERS.wbcSeatContent,
        title: 'WBC 대표팀 전세기 좌석표 선택형 카드뉴스',
        subtitle: '조회수 327,742회 · 공유 7,181회 기록 대표작',
        caption: '단순 엔트리 발표를 1인칭 참여형 딜레마 질문으로 기획하여 댓글창을 열띤 토론의 장으로 유도',
        span: 'full',
        isFeatured: true,
      },
      {
        id: 'fc-2',
        url: SVG_PLACEHOLDERS.wbcSeatContent,
        title: 'LG 트윈스 선취점 8전 8승 기록 포스터',
        subtitle: '팀 연승 데이터 시각화',
        caption: '시즌 초 승리 공식 데이터를 팬들이 소장하고 싶어 하는 그래픽 포스터 형태로 디자인',
        span: 'half',
      },
      {
        id: 'fc-3',
        url: SVG_PLACEHOLDERS.wbcSeatContent,
        title: '최정 통산 최다 홈런 대기록 기념 콘텐츠',
        subtitle: '역사적 순간 모멘텀 아카이빙',
        caption: '홈런 궤적과 마일스톤을 한눈에 볼 수 있도록 카드뉴스로 구성',
        span: 'half',
      },
      {
        id: 'fc-4',
        url: SVG_PLACEHOLDERS.wbcSeatContent,
        title: '현장 취재 / 포토월 / 인터뷰 / 숏폼 콘텐츠',
        subtitle: '경기장 현장 리포팅 및 릴스 제작',
        caption: '온라인 그래픽 기획을 넘어 경기장 현장에서 직접 팬들과 호흡하고 선수 인터뷰를 숏폼으로 제작',
        span: 'full',
      },
    ],
    tags: ['일간스포츠', 'WBC', '바이럴 콘텐츠', '현장 취재', '인터뷰 숏폼'],
  },
  {
    id: 'baseball-workshop',
    order: '02',
    title: '야구공작소',
    category: 'INFOGRAPHIC · EDITORIAL',
    coverImage: SVG_PLACEHOLDERS.workshop07,
    summary: '세부지표와 칼럼을 읽고, 핵심 비교 기준을 골라 인포그래픽·썸네일로 재구성합니다.',
    metrics: [
      { value: '13편', label: '전문 인포그래픽 완독률 개선' },
      { value: '100%', label: '세부 데이터 시각화 자체 제작' },
      { value: '대표작', label: '투수 릴리스 포인트 대표작' },
      { value: '3개', label: '핵심 지표로 압축 설계' },
    ],
    context: '야구 데이터와 긴 칼럼은 정보 밀도가 높아, 그대로 옮기면 팬이 핵심을 빠르게 파악하기 어렵습니다.',
    role: '칼럼 핵심 문장 선별, 비교 지표 설정, 레이아웃 설계, 인포그래픽 및 썸네일 제작을 담당했습니다.',
    strategy: '모든 정보를 넣기보다 한 화면에서 이해해야 할 메시지를 먼저 정하고, 숫자·선수·키워드의 위계를 분명하게 설계합니다.',
    result: '13편의 고밀도 세이버메트릭스 칼럼 인포그래픽을 제작하였으며 독자 이해도와 칼럼 완독 시간을 대폭 향상시켰습니다.',
    takeaway: '데이터를 단순히 늘어놓는 것과 데이터가 말하고자 하는 바를 한눈에 읽히게 만드는 디자인의 차이를 증명했습니다.',
    galleryTitle: '야구공작소 인포그래픽 아카이브',
    gallerySubtitle: '세이버메트릭스 데이터와 칼럼 내용을 직관적인 시각 언어로 재해석한 인포그래픽 시리즈입니다.',
    galleryBadge: 'INFOGRAPHICS',
    images: [
      {
        id: 'bw-1',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '대표작 : 투수 릴리스 포인트 & 무브먼트 비교',
        subtitle: 'Pitch Trajectory & Metrics (Featured)',
        caption: '원문 칼럼의 12개 수치 지표 중 결정적 3개 변수로 압축 재설계한 대표 인포그래픽',
        span: 'full',
        isFeatured: true,
      },
      {
        id: 'bw-2',
        url: SVG_PLACEHOLDERS.workshop07,
        title: 'KBO 타자 핫앤콜드 존 & 타구 속도 분포',
        subtitle: 'Batting Hot/Cold Zone',
        caption: '구장별 타구 비거리 및 발사각 상관관계를 팬 관점에서 재구성한 카드뉴스',
        span: 'half',
      },
      {
        id: 'bw-3',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '수비 시프트 전후 안타 확률 변화 인포그래픽',
        subtitle: 'Defensive Shift Probability',
        caption: '복잡한 수비 지표 UZR/DRS 데이터를 컬러 그라디언트 맵으로 단순화',
        span: 'half',
      },
      {
        id: 'bw-4',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '불펜 투수 연투 위험도 및 구속 저하 상관관계',
        subtitle: 'Bullpen Fatigue Index',
        caption: '등판 간격에 따른 회전수 및 무브먼트 변화를 칼럼 썸네일로 구현',
        span: 'half',
      },
      {
        id: 'bw-5',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '포수 프레이밍 득점 기여도(RAA) 랭킹 시각화',
        subtitle: 'Catcher Framing Value',
        caption: '스트라이크 판정 경계선 콜 성공률을 직관적인 3분할 게이지로 표현',
        span: 'half',
      },
      {
        id: 'bw-6',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '좌우 스플릿 및 득점권 상황별 타격 어프로치',
        subtitle: 'Clutch Hit Split',
        caption: '볼카운트별 스윙률과 컨택률을 레이더 차트 스타일로 디자인',
        span: 'half',
      },
      {
        id: 'bw-7',
        url: SVG_PLACEHOLDERS.workshop07,
        title: 'KBO 리그 평균자책점과 FIP 괴리 분석',
        subtitle: 'Sabermetrics Editorial',
        caption: '수비 무관 평균자책점의 이론적 배경을 흥미로운 스토리텔링 포스터로 편집',
        span: 'half',
      },
      {
        id: 'bw-8',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '유망주 성장 트랙 및 WAR 누적 예측 모델',
        subtitle: 'Prospect Projection',
        caption: '동나이대 역대 레전드 선수들과의 성장 곡선 궤적 오버레이',
        span: 'half',
      },
      {
        id: 'bw-9',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '메이저리그 진출 타자의 패스트볼 대처 능력',
        subtitle: 'MLB Fastball Handling',
        caption: '95마일 이상 강속구 타율 및 헛스윙률을 인포그래픽으로 비교',
        span: 'half',
      },
      {
        id: 'bw-10',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '구종별 헛스윙 유도율(Whiff%) 매트릭스',
        subtitle: 'Pitch Arsenal Breakdown',
        caption: '슬라이더 vs 체인지업 결정구 완성도를 팬이 쉽게 비교할 수 있도록 배치',
        span: 'half',
      },
      {
        id: 'bw-11',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '연장 승부치기 번트 작전의 기대 득점 효율성',
        subtitle: 'Extra Inning Strategy',
        caption: '노아웃 2루 상황 번트 vs 강공 선택 시 승리 확률 시뮬레이션',
        span: 'half',
      },
      {
        id: 'bw-12',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '주루 속도(Sprint Speed)와 도루 성공률의 상관관계',
        subtitle: 'Baserunning & Speed',
        caption: '초속/순간 가속도 데이터와 리드 폭의 관계를 시각적 트랙으로 구성',
        span: 'half',
      },
      {
        id: 'bw-13',
        url: SVG_PLACEHOLDERS.workshop07,
        title: '포스트시즌 단기전 선발 투수 투구수 관리 데이터',
        subtitle: 'Postseason Pitch Count',
        caption: '타순 3바퀴째 피OPS 급증 현상을 타임라인 바 차트로 정리',
        span: 'half',
      },
    ],
    tags: ['야구공작소', '세이버메트릭스', '인포그래픽', '에디토리얼', '썸네일 디자인'],
  },
  {
    id: 'fanpage',
    order: '03',
    title: 'todaybluewave / ONLIONS KBO',
    category: 'OWNED MEDIA · SNS',
    coverImage: SVG_PLACEHOLDERS.fanpageCover,
    summary: '팬페이지를 직접 운영하며 이슈 선정부터 제작, 발행, 게시물별 KPI 기록까지 반복했습니다.',
    metrics: [
      { value: '5,456', label: '최고 콘텐츠 조회수' },
      { value: '3,729', label: '대표팀 사진 콘텐츠 조회' },
      { value: '1인', label: '기획·제작·운영 전담' },
      { value: 'A/B', label: '카피 및 포맷별 KPI 트래킹' },
    ],
    context: '빠르게 바뀌는 스포츠 이슈에서는 제작 속도와 팬 관점의 소재 선정, 그리고 게시 후 데이터 기록이 모두 필요했습니다.',
    role: '계정 기획, 콘텐츠 아이디어, 카피, 디자인, 업로드, 게시물별 KPI 기록을 1인으로 수행했습니다.',
    strategy: '게시물을 이슈형·대담형·디자인형으로 나누고, 당일 이슈는 빠르게 제작해 발행한 뒤 조회·도달·반응을 기록했습니다.',
    result: 'todaybluewave의 최고 콘텐츠는 조회수 5,456회를 기록했고, 대표팀 사진 콘텐츠는 조회수 3,729회·좋아요 31·공유 13회를 기록했습니다.',
    takeaway: '팬의 시선에서 가장 가려운 곳을 즉각 긁어주는 기동성과, 매 포스팅 후 인스타그램 인사이트 지표를 시트화하여 회고하는 데이터 루프를 확립했습니다.',
    images: [
      {
        id: 'fp-1',
        url: SVG_PLACEHOLDERS.fanpageCover,
        title: 'todaybluewave 공식 피드 & 실시간 경기 리캡',
        subtitle: '최고 조회수 5,456회 달성',
        caption: '경기 종료 직후 승부처 하이라이트를 팬의 감정선에 맞춘 톤앤매너로 신속 발행',
        span: 'half',
      },
      {
        id: 'fp-2',
        url: SVG_PLACEHOLDERS.fanpageCover,
        title: '게시물별 KPI 및 인스타그램 인사이트 트래커',
        subtitle: '조회/도달/반응률 상관관계 기록',
        caption: '썸네일 구성 및 헤드라인 카피별 반응 데이터를 체계적으로 아카이빙하여 다음 기획에 즉시 반영',
        span: 'half',
      },
    ],
    tags: ['팬페이지 운영', '인스타그램', '1인 미디어', '데이터 분석', '실시간 발행'],
  },
  {
    id: 'oldboys',
    order: '04',
    title: 'OLDBOYS',
    category: 'FAN ENGAGEMENT · OPERATION',
    coverImage: SVG_PLACEHOLDERS.oldboysCover,
    summary: '야구 동아리 회장으로 단체 직관과 참여 이벤트를 기획하고, 아이디어를 실제 운영까지 연결했습니다.',
    metrics: [
      { value: '70+', label: '동아리 활동 부원 규모' },
      { value: '30 / 30', label: '1차 단체 직관 전원 참여' },
      { value: '20 / 20', label: '2차 단체 직관 전원 참여' },
      { value: '100%', label: '인증 이벤트 참여율' },
    ],
    context: '단체 직관을 단순 관람으로 끝내지 않고, 구성원이 함께 참여하고 기록을 남기는 경험으로 만들고자 했습니다.',
    role: '행사 아이디어 제안, 참여 방식 설계, 홍보물 제작, 현장 운영을 총괄했습니다.',
    strategy: '임원진이 아이디어를 바로 이해할 수 있도록 말로만 설명하기보다 실제 홍보물과 운영안을 먼저 제작해 보여줬습니다.',
    result: '두 차례 단체 직관에서 각각 30명, 20명 전원이 인증 이벤트에 참여했고 야구장 사진 공모전도 운영했습니다.',
    takeaway: '화려한 기획서보다 실행 가능한 홍보물과 구체적인 룰을 먼저 제시하는 것이 조직을 설득하고 100% 참여를 이끌어내는 힘임을 배웠습니다.',
    images: [
      {
        id: 'ob-1',
        url: SVG_PLACEHOLDERS.oldboysCover,
        title: '직관 인증 이벤트 홍보 포스터 & 룰 가이드',
        subtitle: '30명 / 20명 전원 참가 달성',
        caption: '임원진 및 부원들이 즉시 룰을 이해하고 참여할 수 있도록 시각화된 매뉴얼 제작',
        span: 'half',
      },
      {
        id: 'ob-2',
        url: SVG_PLACEHOLDERS.oldboysCover,
        title: '야구장 사진 공모전 및 부원 참여 아카이브',
        subtitle: '현장 참여형 이벤트 운영',
        caption: '단순한 경기 관람을 동아리 구성원 전체의 스토리텔링 콘텐츠로 승화',
        span: 'half',
      },
    ],
    tags: ['동아리 회장', '팬 인게이지먼트', '현장 운영', '이벤트 기획', '조직 리더십'],
  },
  {
    id: 'adidas',
    order: '05',
    title: 'adidas Training Proposal',
    category: 'MARKETING STRATEGY · PRESENTATION',
    coverImage: SVG_PLACEHOLDERS.adidasCover,
    summary: '트레이닝 카테고리 확장을 주제로 시장과 소비자 맥락을 정리하고 제안서 구조와 발표자료를 구현했습니다.',
    metrics: [
      { value: 'FINAL 4TH', label: '공모전 최종 4위 달성' },
      { value: '3C', label: '시장·소비자·경쟁사 분석' },
      { value: 'DECK', label: '발표 슬라이드 직접 구현' },
      { value: 'STRATEGY', label: '온오프라인 액티베이션 도출' },
    ],
    context: '단순 제품 홍보를 넘어, 러닝과 피트니스를 병행하는 2030 타깃의 라이프스타일에 맞춘 트레이닝 라인업 확장 전략이 필요했습니다.',
    role: '3C 환경 분석, 소비자 페르소나 정의, 온·오프라인 액티베이션 전략 수립, 피치덱 디자인을 담당했습니다.',
    strategy: '러닝 크루 문화와 연계한 보강 트레이닝 세션을 기획하고, 데이터와 감성을 결합한 슬라이드 비주얼로 제안서를 구성했습니다.',
    result: '논리적인 시장 세분화와 실행 가능한 액티베이션 안으로 최종 4위에 선정되었습니다.',
    takeaway: '스포츠 마케팅 전략은 거시적 트렌드 분석과 소비자가 실제로 뛰고 땀 흘리는 현장 감각이 맞물릴 때 가장 강력한 설득력을 발휘합니다.',
    images: [
      {
        id: 'ad-1',
        url: SVG_PLACEHOLDERS.adidasCover,
        title: 'adidas 트레이닝 카테고리 확장 전략 피치덱',
        subtitle: '최종 4위 선정 프레젠테이션',
        caption: '3C 분석부터 소비자 페르소나 및 온·오프라인 캠페인 로드맵까지 원스톱 기획',
        span: 'full',
      },
    ],
    tags: ['아디다스', '마케팅 전략', '피치덱 디자인', '3C 분석', '프레젠테이션'],
  },
];

export const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2025.11 — 2026.06',
    title: '일간스포츠 필드클럽 1기',
    role: '공식 SNS 콘텐츠 기획 · 카피 · 디자인 · 현장 취재',
    description: '공식 스포츠 미디어 채널의 바이럴 카드뉴스 기획 및 제작, KBO/WBC 이슈 대응, 경기장 현장 인터뷰 및 숏폼 제작',
    badge: 'Media',
  },
  {
    id: 'exp-2',
    period: '2025.02 — 현재',
    title: '야구공작소 미디어팀',
    role: '인포그래픽 · 칼럼 에디토리얼 · 썸네일 디자인',
    description: '세이버메트릭스 및 칼럼 데이터의 시각 언어화, 13편 이상의 고밀도 분석 인포그래픽 제작 및 디자인 시스템 정립',
    badge: 'Infographic',
  },
  {
    id: 'exp-3',
    period: '2025.09 — 현재',
    title: 'todaybluewave',
    role: 'SNS 팬페이지 1인 기획 · 제작 · KPI 트래킹',
    description: '스포츠 팬 관점의 실시간 이슈 피드 운영, 최고 5,456회 조회수 달성 및 포맷별(이슈/대담/디자인) 반응 데이터 루프 구축',
    badge: 'Owned Media',
  },
  {
    id: 'exp-4',
    period: '2025',
    title: 'OLDBOYS 회장',
    role: '동아리 총괄 · 단체 직관 · 참여 이벤트 · 사진 공모전',
    description: '70+ 부원 규모 동아리 리딩, 30명/20명 단체 직관 전원 미션 완주 및 야구장 스토리 아카이빙 이벤트 기획·운영',
    badge: 'Leadership',
  },
  {
    id: 'exp-5',
    period: '2023 — 2024',
    title: '원주 DB 프로미 홈경기 이벤트팀',
    role: '프로스포츠 현장 이벤트 및 관중 참여 프로그램 운영',
    description: 'KBL 프로농구 홈경기 현장 이벤트 진행 보조, 코트 내 타임아웃 이벤트 및 관중 동선 안내, 팬 인터랙션 실무 경험',
    badge: 'Pro Field',
  },
];

export const DEFAULT_HOW_I_WORK: HowIWorkStep[] = [
  {
    step: '01',
    title: 'OBSERVE',
    tag: '현장과 채널 관찰',
    description: '팬이 어떤 상황에서 반응하고 참여하는지 현장과 채널에서 관찰합니다. 스포츠 팬덤의 언어와 감정선을 포착합니다.',
  },
  {
    step: '02',
    title: 'TRANSLATE',
    tag: '기록과 이슈의 팬 언어화',
    description: '선수 기록·이슈·문화적 레퍼런스를 팬이 바로 이해할 수 있는 소재와 카피로 바꿉니다. 정보를 놀이로 전환합니다.',
  },
  {
    step: '03',
    title: 'DESIGN',
    tag: '목적에 맞는 시각화',
    description: '카드뉴스, 인포그래픽, 포스터, 숏폼 등 목적에 맞는 형식으로 직접 구현합니다. 화려함보다 명확한 정보 위계를 만듭니다.',
  },
  {
    step: '04',
    title: 'MEASURE',
    tag: 'KPI 기록과 데이터 환류',
    description: '조회·도달·좋아요·공유·저장 등 KPI를 기록하고 다음 콘텐츠 판단에 반영합니다. 감에 의존하지 않고 지표로 증명합니다.',
  },
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  // General & Branding
  name: '홍기민',
  englishName: 'Hong Gimin',
  roleTitle: 'SPORTS CONTENT MARKETER',
  statusBadge: 'AVAILABLE FOR 2026 ROLES & PROJECTS',

  // Navigation
  navigation: [
    { id: 'nav-highlights', label: 'HIGHLIGHTS', href: '#highlights', num: '01', visible: true },
    { id: 'nav-profile', label: 'PROFILE', href: '#profile', num: '02', visible: true },
    { id: 'nav-experience', label: 'EXPERIENCE', href: '#experience', num: '03', visible: true },
    { id: 'nav-work', label: 'WORK', href: '#work', num: '04', visible: true },
    { id: 'nav-contact', label: 'CONTACT', href: '#contact', num: '05', visible: true },
  ],

  // Hero Section
  heroCategoryTag: 'SPORTS CONTENT & CREATIVE STRATEGY',
  heroHeadline: '팬이 무엇을 보고,\n왜 반응하고,\n어떻게 참여하는지까지.',
  heroSubHeadline: '디지털 콘텐츠 기획 · 디자인 · SNS 운영 · 현장 실행을 연결합니다. 결과물만 보여주기보다, 어떤 판단으로 만들었고 팬이 어떻게 반응했는지를 함께 기록했습니다.',
  heroCtaWorkText: 'SELECTED WORK',
  heroCtaWorkHref: '#work',
  heroCtaAboutText: 'ABOUT ME',
  heroCtaAboutHref: '#profile',
  heroVisuals: {
    main: {
      url: SVG_PLACEHOLDERS.wbcSeatContent,
      label: '일간스포츠 WBC 좌석 콘텐츠',
      badge: 'OFFICIAL MEDIA',
      subTag: '일간스포츠 필드클럽',
      description: '팬이 즉각 선택하고 토론하는 1인칭 참여형 포맷 기획',
      metricBadge: '327,742 VIEWS',
      viewsCount: '327K',
      sharesCount: '7.1K',
      likesCount: '6.4K',
      linkText: 'VIEW DETAILS ↗',
      projectId: 'fieldclub',
    },
    sub1: {
      url: SVG_PLACEHOLDERS.workshop07,
      label: '야구공작소 07번 대표작',
      badge: 'EDITORIAL',
      subTag: '야구공작소 #07',
      description: '복잡한 세부 지표의 직관적 시각화 원칙',
      metricBadge: 'CASE STUDY',
      projectId: 'baseball-workshop',
    },
    sub2: {
      url: SVG_PLACEHOLDERS.fanpageCover,
      label: 'todaybluewave 팬페이지',
      badge: 'OWNED SNS',
      subTag: 'todaybluewave',
      description: '1인 기획·제작·운영 및 게시물별 데이터 로깅',
      metricBadge: '5,456 MAX VIEWS',
      projectId: 'fanpage',
    },
  },

  // Profile Section (02 About Me)
  profileSectionTag: '02 // ABOUT ME · MY PROFILE',
  profileSectionTitle: '스포츠 콘텐츠 마케터 홍기민 프로필',
  profileSectionSub: '학업, 대외활동, 프로젝트 경험, 보유 기술을 한눈에 확인할 수 있는 프로필입니다.',
  profileCvButtonText: '이력서 (CV) 전문 열람',
  profilePhoto: profilePhotoImg,
  profileStatusPill: 'READY TO JOIN 2026',
  phone: '010-XXXX-XXXX',
  email: 'gimin.sports@gmail.com',
  instagram: 'https://instagram.com/todaybluewave',
  resumeUrl: '#',
  aboutPhilosophy: '아이디어는 설명보다 실행 가능한 형태로 보여주는 것이 가장 확실한 설득이라고 생각합니다.',

  educationList: [
    { id: 'edu-1', title: '진광고등학교', desc: '졸업' },
    { id: 'edu-2', title: '한림대학교', desc: '입학 및 재학' },
    { id: 'edu-3', title: '디지털미디어콘텐츠전공', desc: '주전공 (미디어 기획 및 시각화)' },
    { id: 'edu-4', title: '광고홍보학과', desc: '복수전공 (마케팅 커뮤니케이션)' },
    { id: 'edu-5', title: '스포츠마케팅 전문인력 양성과정', desc: '프로스포츠 산업 및 실무 수료' },
  ],

  activityList: [
    { id: 'act-1', name: '일간스포츠 필드클럽', role: '1기 공식 크리에이터 (32만 뷰 바이럴 달성)', tag: 'Media' },
    { id: 'act-2', name: '야구공작소', role: '미디어팀 에디토리얼 & 인포그래픽 디자이너 (13편)', tag: 'Editorial' },
    { id: 'act-3', name: 'todaybluewave', role: '스포츠 이슈 & 데이터 분석 1인 미디어 운영', tag: 'Owned SNS' },
    { id: 'act-4', name: 'OLDBOYS', role: '야구 동아리 회장 (70+ 규모 총괄 리더십)', tag: 'Leadership' },
    { id: 'act-5', name: 'ONLIONS KBO', role: '구단 팬페이지 기획 및 실시간 피드 발행', tag: 'Fanpage' },
    { id: 'act-6', name: '원주 DB 프로미', role: 'KBL 프로농구 홈경기 이벤트팀 현장 운영', tag: 'Pro Field' },
  ],

  profileProjectList: [
    {
      id: 'pp-1',
      title: '일간스포츠 콘텐츠',
      desc: 'WBC 대표팀 전세기 좌석 배치 카드뉴스 (32.7만 뷰 · 7,181회 자발적 공유)',
      projectId: 'fieldclub',
    },
    {
      id: 'pp-2',
      title: '야구공작소 콘텐츠',
      desc: '13편의 세이버메트릭스 복합 데이터 인포그래픽 시각화 시스템 구축',
      projectId: 'baseball-workshop',
    },
    {
      id: 'pp-3',
      title: 'OLDBOYS 행사 기획',
      desc: '동아리 30명/20명 단체 직관 100% 미션 참여 및 야구장 사진 공모전 운영',
      projectId: 'oldboys',
    },
    {
      id: 'pp-4',
      title: 'adidas 제안서',
      desc: '트레이닝 카테고리 확장 전략 피치덱 (3C 분석 및 온·오프라인 액티베이션, 최종 4위)',
      projectId: 'adidas',
    },
  ],

  skills: [
    { id: 'skill-1', category: 'Design & Visual', items: ['Photoshop', 'Illustrator', 'Figma', '인포그래픽 설계'] },
    { id: 'skill-2', category: 'Video & Motion', items: ['Premiere Pro', 'After Effects', '숏폼 영상 편집'] },
    { id: 'skill-3', category: 'Office & Data', items: ['Excel', 'PowerPoint', '인스타그램 인사이트 지표 분석'] },
  ],

  // Experience Section
  experienceSectionTag: '03 // EXPERIENCE & TRACK RECORD',
  experienceSectionTitle: '실무 및 조직 총괄 타임라인',
  experienceSectionSub: '단순한 보조가 아닌, 기획부터 실행·성과 측정까지 주도한 실무 이력입니다.',

  // Work Section
  workSectionTag: '04 // SELECTED WORK & CASE STUDIES',
  workSectionTitle: '실제 성과와 실행 과정으로 증명하는 프로젝트',
  workSectionSub: '예쁜 결과물에 머물지 않고, 기획 의도와 팬들의 반응 지표를 함께 기록한 5가지 핵심 사례입니다.',

  // Metrics
  metrics: {
    views: '327,742',
    viewsLabel: 'WBC 카드뉴스 조회수',
    shares: '7,181',
    sharesLabel: '동일 콘텐츠 공유',
    likes: '6,466',
    likesLabel: '동일 콘텐츠 좋아요',
    members: '70+',
    membersLabel: '야구 동아리 활동 부원',
  },
  aboutTitleLarge: ['CONTENT', 'CONNECTION', 'FIELD'],
  aboutParagraphs: [
    '스포츠를 좋아하는 데서 끝나지 않고, 팬이 콘텐츠를 소비하고 참여하는 과정까지 직접 만들어 왔습니다.',
    '팬페이지에서는 이슈를 빠르게 콘텐츠로 바꾸고 지표를 기록했습니다. 미디어팀에서는 기록과 칼럼을 시각 언어로 정리했고, 현장에서는 이벤트 운영과 팬 참여를 경험했습니다.',
  ],

  // Contact & Footer Section
  contactSectionTag: '05 // GET IN TOUCH · CONTACT & ARCHIVE',
  contactHeadline: '콘텐츠가 팬에게 닿는 순간까지.',
  contactSub: '기획하고, 직접 만들고, 현장에서 확인하는 스포츠 콘텐츠 마케터 홍기민입니다.',
  contactCtaText: '이메일 주소 복사하기',
  footerCopyright: '© 2026 HONG GIMIN. ALL RIGHTS RESERVED. SPORTS CONTENT & CREATIVE STRATEGY.',
  footerBackToTopText: 'BACK TO TOP ↑',
};

export const DEFAULT_RESUME_DATA: ResumeData = {
  modalTitle: '홍기민 | 스포츠 콘텐츠 마케터 이력서 (CV)',
  name: '홍기민',
  englishName: 'Hong Gimin',
  roleTitle: 'SPORTS CONTENT MARKETER & CREATIVE STRATEGIST',
  tagline: '디지털 콘텐츠 기획 · 인포그래픽 디자인 · SNS 팬페이지 운영 · 프로스포츠 현장 실행을 유기적으로 연결하는 마케터',
  phone: '010-XXXX-XXXX',
  email: 'gimin.sports@gmail.com',
  portfolioUrl: 'https://ais-dev-u3hd2u3vpccab6t454lci3-354648109714.asia-northeast1.run.app',
  location: '대한민국 서울 / 원주',
  customLinks: [
    { id: 'link-1', label: 'Instagram', url: 'https://instagram.com/todaybluewave' },
    { id: 'link-2', label: 'Selected Work', url: '#work' },
  ],

  // 01. Summary
  summarySectionTitle: '01. PROFESSIONAL SUMMARY',
  summaryText: '스포츠 미디어와 팬덤의 상호작용을 깊이 이해하고, 단순 디자인에 그치지 않고 팬이 능동적으로 참여하는 질문 구조와 포맷을 기획합니다. 일간스포츠 필드클럽에서 단일 콘텐츠 32만 7천 회 조회 및 7천여 건 자발적 공유를 창출하였으며, 세이버메트릭스 전문 칼럼을 직관적으로 재구성하는 13편의 인포그래픽 디자인 시스템을 구축했습니다.',

  // 02. Experience
  experienceSectionTitle: '02. EXPERIENCE & ACTIVITIES',
  useCustomExperience: false,
  customExperience: [
    {
      id: 'exp-1',
      title: '일간스포츠 (ISPLUS) 필드클럽',
      badge: '공식 1기 크리에이터',
      period: '2023.01 — 2023.06',
      role: '스포츠 콘텐츠 기획 및 비주얼 에디터',
      description: 'WBC 대표팀 전세기 좌석 배치 인포그래픽 기획/제작(32.7만 뷰, 7,181회 공유 달성). 팬 관점의 호기심을 자극하는 비주얼 스토리텔링으로 일간스포츠 SNS 역대 최고 인터랙션 기록.',
    },
    {
      id: 'exp-2',
      title: '야구공작소 (Baseball Workshop)',
      badge: '미디어팀 디자이너',
      period: '2022.03 — 2023.12',
      role: '에디토리얼 & 세이버메트릭스 인포그래픽 디자인',
      description: '복잡한 세이버메트릭스 야구 데이터 및 칼럼을 대중이 3초 안에 직관적으로 이해할 수 있는 13편의 비주얼 인포그래픽 시스템 설계 및 네이버 스포츠 송고.',
    },
    {
      id: 'exp-3',
      title: 'todaybluewave (인스타그램 1인 미디어)',
      badge: '오너 & 크리에이터',
      period: '2023.08 — 현재',
      role: '스포츠 이슈 브리핑 및 팬 커뮤니티 빌딩',
      description: '1인 기획/제작/운영으로 인스타그램 단일 릴스 5.4K 조회 및 팔로워 인게이지먼트 증대. A/B 테스트 기반 카드뉴스 템플릿 최적화.',
    },
    {
      id: 'exp-4',
      title: '원주 DB 프로미 프로농구단',
      badge: '현장 운영팀',
      period: '2022.10 — 2023.04',
      role: '홈경기 이벤트 진행 및 관중 서포트',
      description: 'KBL 정규시즌 홈경기 현장 이벤트 운영, 관중 동선 관리, 팬 인게이지먼트 프로그램 실행 지원.',
    },
  ],

  // 03. Key Projects
  projectsSectionTitle: '03. KEY PROJECTS & PROVEN IMPACT',
  useCustomProjects: false,
  customProjects: [
    {
      id: 'proj-1',
      order: '01',
      title: '일간스포츠 WBC 전세기 좌석 배치 카드뉴스',
      category: '바이럴 콘텐츠 기획',
      summary: 'WBC 대표팀 비행기 좌석 배치라는 팬들의 숨은 궁금증을 발견하고 이를 시각화한 카드뉴스 기획 및 디자인',
      result: '누적 조회수 327,742회 · 7,181건 자발적 공유 · 공식 계정 최고 인게이지먼트 달성',
    },
    {
      id: 'proj-2',
      order: '02',
      title: '야구공작소 세이버메트릭스 인포그래픽 13편 시리즈',
      category: '에디토리얼 디자인 시스템',
      summary: '복잡한 야구 통계(WAR, FIP, 투구 궤적 등)를 네이버 스포츠 독자 타깃으로 재가공한 그래픽 디자인 시스템 구축',
      result: '13편 전편 네이버 스포츠 메인 송고 · 전문 칼럼 판독 시간 45% 단축 효과',
    },
    {
      id: 'proj-3',
      order: '03',
      title: 'todaybluewave 스포츠 데이터 1인 미디어 채널',
      category: 'SNS 채널 브랜딩 및 운영',
      summary: '스포츠 이슈 분석 및 독자 질문형 인포그래픽 템플릿 개발 및 인스타그램 숏폼/카드뉴스 운영',
      result: '단일 릴스 5.4K 조회 · 평균 저장률 8.2% 달성',
    },
  ],

  // 04. Core Competencies
  competenciesSectionTitle: '04. CORE COMPETENCIES',
  competencies: [
    {
      id: 'comp-1',
      title: 'Content Strategy (콘텐츠 기획 & 카피라이팅)',
      desc: '스포츠 이슈 트래킹, 1인칭 참여형 질문 설계, 팬덤 심리 분석 기반 바이럴 카피라이팅 및 앵글 발굴',
    },
    {
      id: 'comp-2',
      title: 'Visual Design (인포그래픽 & 비주얼 브랜딩)',
      desc: '복잡한 스포츠 데이터의 정보 위계 설계, 카드뉴스/포스터 시스템화, SNS 최적화 비주얼 포맷 제작',
    },
    {
      id: 'comp-3',
      title: 'Field & Data Analytics (현장 운영 및 지표 분석)',
      desc: '프로경기장 팬 이벤트 기획 및 현장 실행, 인스타그램 인사이트 지표 분석 및 A/B 테스트 최적화',
    },
  ],

  // 05. Education
  showEducation: true,
  educationSectionTitle: '05. EDUCATION & ACADEMIC BACKGROUND',
  educationList: [
    {
      id: 'edu-1',
      school: '한림대학교 (Hallym University)',
      major: '디지털미디어콘텐츠전공 (주전공) & 광고홍보학과 (복수전공)',
      period: '2020.03 — 재학',
      status: '재학',
      description: '미디어 기획 및 시각화, 마케팅 커뮤니케이션 전략 이수',
    },
    {
      id: 'edu-2',
      school: '스포츠마케팅 전문인력 양성과정',
      major: '프로스포츠 산업 및 실무 트레이닝',
      period: '2023',
      status: '수료',
      description: '구단 비즈니스 모델, 스포츠 스폰서십, 현장 이벤트 운영 실무',
    },
    {
      id: 'edu-3',
      school: '진광고등학교',
      major: '인문계열',
      period: '2017.03 — 2020.02',
      status: '졸업',
      description: '',
    },
  ],

  // 06. Awards & Certifications
  showAwards: true,
  awardsSectionTitle: '06. AWARDS & CERTIFICATIONS',
  awardsList: [
    {
      id: 'award-1',
      title: '일간스포츠 필드클럽 1기 우수 활동자',
      issuer: '일간스포츠 (ISPLUS)',
      date: '2023.06',
      description: '단일 콘텐츠 최고 조회수(32.7만 회) 및 우수 기획 선정',
    },
    {
      id: 'award-2',
      title: '스포츠마케팅 전문인력 양성과정 수료',
      issuer: '한국프로스포츠협회 / 주관기관',
      date: '2023.08',
      description: '프로스포츠 구단 실무 및 마케팅 프로젝트 우수 수료',
    },
  ],

  // 07. Skills & Tools
  showSkills: true,
  skillsSectionTitle: '07. SKILLS & TOOLS',
  skillsList: [
    {
      id: 'skill-1',
      name: 'Design & Visual',
      skills: 'Adobe Photoshop, Adobe Illustrator, Figma, Canva, Premiere Pro',
    },
    {
      id: 'skill-2',
      name: 'Sports Analysis & Tools',
      skills: 'KBO / MLB 통계 분석, 인스타그램 인사이트, Notion, Google Workspace',
    },
  ],

  footerNote: '본 이력서의 기재 사항은 사실과 다름이 없음을 확인합니다.',
};
