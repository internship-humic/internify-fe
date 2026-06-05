import HomeHeader from '../intern/components/HomeHeader'
import HomeCalendar from '../intern/components/HomeCalendar'
import HomeMentorProject from './components/HomeMentorProject'

const HomeMentorPage = () => {
  return (
    <div className="flex-1 px-14 py-10 bg-gray-50">
      <HomeHeader />
      <div className="flex flex-col gap-5">
        <div className="">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <HomeMentorProject />
          </div>

        </div>
        <div className="bg-white  rounded-xl">
          <HomeCalendar />
        </div>
      </div>
      </div>
  )
}

export default HomeMentorPage
