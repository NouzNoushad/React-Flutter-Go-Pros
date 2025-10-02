export default function VideosMain() {
    const videoLists = [
        {
            'title': 'video1',
            'video': '',
            'duration': '2hr'
        },
        {
            'title': 'video2',
            'video': '',
            'duration': '2hr'
        },
        {
            'title': 'video3',
            'video': '',
            'duration': '2hr'
        },
        {
            'title': 'video4',
            'video': '',
            'duration': '2hr'
        },
        {
            'title': 'video5',
            'video': '',
            'duration': '2hr'
        },
        {
            'title': 'video6',
            'video': '',
            'duration': '2hr'
        },
    ]
    return (
        <div className="mt-[5rem] container-md w-full">
            <div className="mt-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                {
                    videoLists.map((video, index) => (
                        <div className="border-2 border-amber-800 rounded-lg shadow px-3 py-3" key={index}>
                            <div className="h-[150px] bg-amber-100 rounded-lg">

                            </div>
                            <div className="mt-2">
                                <h2>{video['title']}</h2>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
