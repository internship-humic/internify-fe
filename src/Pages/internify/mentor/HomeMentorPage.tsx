import HomeHeader from '../intern/components/HomeHeader'
import HomeCalendar from '../HomeCalendar'
import HomeMentorProject from './components/HomeMentorProject'

const HomeMentorPage = () => {
  return (
    <div className="flex-1">
      <HomeHeader />
      <div className="flex flex-col gap-5">
        <div className="">
          <div>
            <HomeMentorProject />
          </div>
        </div>
        <div className="bg-white rounded-xl">
          <HomeCalendar />
        </div>
      </div>
      </div>
  )
}

export default HomeMentorPage
