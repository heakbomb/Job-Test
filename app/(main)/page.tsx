import ProductList from '@/components/features/products/ProductList'

export default function HomePage() {
  return (
    <>
      <section className="w-full h-[491px] bg-wash flex items-center justify-center relative">
        <img src="/banner.png" alt="프로모 배너" className="w-full h-[490px] object-cover" />
        <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 flex items-center justify-center w-[60px] h-[29px] bg-ink rounded-full">
          <span className="text-[10px] text-white">1/5</span>
        </div>
      </section>

      <section className="w-full bg-white">
        <ProductList />
      </section>
    </>
  )
}
