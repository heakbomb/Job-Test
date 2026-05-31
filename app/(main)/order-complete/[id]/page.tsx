import Link from 'next/link'

export default async function OrderCompletePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const shortId = id.split('-')[0].toUpperCase()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[40px]">
      <div className="flex flex-col items-center gap-[20px]">
        <div className="w-[72px] h-[72px] bg-brand rounded-full flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M7 18l8 8L29 9"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-[28px] font-bold text-ink">주문이 완료됐습니다!</h1>
        <div className="flex flex-col items-center gap-[8px]">
          <p className="text-[14px] text-muted">
            주문번호:{' '}
            <span className="text-ink font-semibold">{shortId}</span>
          </p>
          <p className="text-[14px] text-muted text-center">
            입력하신 이메일로 주문 확인 안내가 전송됩니다.
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="h-[48px] px-[32px] bg-brand text-white text-[16px] font-semibold rounded-sm flex items-center hover:opacity-90 transition-opacity"
      >
        쇼핑 계속하기
      </Link>
    </div>
  )
}
