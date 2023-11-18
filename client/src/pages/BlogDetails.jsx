import FormEdition from './FormEdition';
import ImageOne from '/images/sample.svg';

const BlogDetails = () => {
  return (
    <div className="pt-10">
      <div className="relative">
        <img src={ImageOne} alt="" className="w-full brightness-90" />
        <div className="flex gap-4 absolute top-3 left-2 max-w-full flex-wrap">
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
        </div>
        <div className="absolute bottom-0 left-2">
          <h2 className="uppercase font-bold text-xl sm:text-2xl py-2 text-white dark:text-t-dark mb-3">
            Integer Maecenas Eget Viverra Repete Incuras und Rwrherufhk
          </h2>
          <p className="font-medium text-white mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            ipsam molestiae dolorem delectus culpa? Corporis quo eaque commodi
            inventore tempore!
          </p>
        </div>
      </div>
      <div className='my-5'>
        <div className='flex justify-between'>
          <span>By Lorem ipsum.</span>
          <span>13 Jan, 2022</span>
        </div>
      </div>
      <FormEdition />
    </div>
  );
}

export default BlogDetails