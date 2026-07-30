const Stats = [
    {
        count : "5k" ,
        label : "Active Students"
    },
    {
        count : "10+",
        label : "Mentors",
    },
    {
        count : "200+",
        label : "Courses"
    },
    {
        count : "50+",
        label : "Awards"
    }
]
const StatsComponent = () => {
    
    return(
        <section>
            <div className="flex items-center justify-evenly p-3  bg-richblack-400 mx-auto">
                {
                    Stats.map((element,index)=>(
                        <div key = {index} className="flex flex-col gap-1">
                            <p className="text-white text-lg font-semibold">
                                {element.count}
                            </p>
                            <p className="text-richblack-200">
                                {element.label}
                            </p>
                        </div>    
                    ))
                }
            </div>
        </section>
    )
}
export default StatsComponent;