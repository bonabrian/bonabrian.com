import UnderDevelopmentImage from '../../public/static/UnderDevelopment.svg'

export const UnderDevelopment = () => {
  return (
    <div className='flex items-center flex-col my-14'>
      <UnderDevelopmentImage className='fill-current w-3/4' />
      <h1 className='text-3xl my-5'>
        Ooopsss... this page is under development
      </h1>
    </div>
  )
}
