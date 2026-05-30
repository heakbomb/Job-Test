export default function Footer() {
  return (
    <footer className="w-full h-[180px] bg-white flex items-center justify-center">
      <div className="w-[1320px] h-[100px] flex flex-col justify-center gap-[8px]">
        <div className="flex items-center gap-[8px] text-[14px] text-footer">
          <span>회사소개</span>
          <span>|</span>
          <span>이용약관</span>
          <span>|</span>
          <span>개인정보처리방침</span>
        </div>

        <p className="text-[14px] text-footer leading-[1.6]">
          (주)히든카이스 | 대표: 안영호 | 사업자등록번호: 735-87-02522 (사업자정보확인)<br />
          주소: 경기도 고양시 일산서구 일현로 97-11, 56F | 통신판매업신고: 제 2024-고양일산서-1209 | 이메일: Hidden_kice@naver.com
        </p>

        <p className="text-[14px] text-footer">
          Copyright © 2026 히든카이스. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
