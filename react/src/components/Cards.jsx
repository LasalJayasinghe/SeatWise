const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://img.freepik.com/photos-gratuite/salade-vue-dessus-dans-bol-sombre_23-2148537230.jpg?w=740&t=st=1689415240~exp=1689415840~hmac=1ad469f6fb98eba528ce1f2fe314ec686216a9935433bf2b4db100dfad753022',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    // More products...
  ]
  
  export default function Cards() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl  tracking-tight text-gray-500">Meals you may like</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-tl-xl rounded-tr-xl bg-gray-200 lg:aspect-none group-hover:brightness-75 transition duration-300 lg:h-80 ">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-0 p-4 flex justify-between rounded-bl-xl rounded-br-xl bg-black">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        Brocolli Salade
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Salad</p>
                  </div>
                  <p className="text-sm font-medium text-gray-100">690 LKR</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }