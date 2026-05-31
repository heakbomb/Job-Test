import Link from 'next/link'

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[40px]">
      <div className="flex flex-col items-center gap-[16px]">
        <p className="text-[14px] font-semibold text-brand">COMING SOON</p>
        <h1 className="text-[32px] font-bold text-ink">페이지 준비 중입니다</h1>
        <p className="text-[16px] text-muted">더 나은 서비스를 위해 열심히 준비하고 있어요.</p>
      </div>

      <Link
        href="/"
        className="h-[48px] px-[32px] bg-brand text-white text-[16px] font-semibold rounded-sm flex items-center hover:opacity-90 transition-opacity"
      >
        메인으로 돌아가기
      </Link>
    </div>
  )
}
