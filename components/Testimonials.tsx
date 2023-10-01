import Image from "next/image";
import Link from "next/link";

const testimonials = [
  [
    {
      content: "I've always wanted to see my pet as a cartoon, and this web app made my dream come true",
      link: "https://twitter.com/",
      pic: "/bunny.png",
      author: {
        name: "Emily R.",
        role: "Teacher",
        image: "/emily.jpg",
      },
    }
  ],
  [
    {
      content:
        "The cartoon transformations are so good! My pet's personality shines through in every cartoon created",
      link: "https://twitter.com/",
      pic: "/cat.png",
      author: {
        name: "Sarah W.",
        role: "Graphic Designer",
        image: "/sarah.png",
      },
    },
  ],
  [
    {
      content:
        "I can't stop smiling every time I see my pet's cartoon avatar. It adds a whole new level of joy to my life!",
      link: "https://twitter.com/",
      pic: "/horse.png",
      author: {
        name: "Lisa M.",
        role: "Veterinarian",
        image: "/lisa.png",
      },
    }
  ],
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-10"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 md:px-7">
        <div className="mx-auto md:text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800 sm:text-6xl">
            Loved by many worldwide
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-gray-600  text-gray-600 leading-7">
            See what our users are saying about{" "}
              <span className="text-green-600">CartoonPetPics</span>
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-16 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li
                    key={testimonialIndex}
                    className="hover:scale-105 transition duration-300 ease-in-out "
                  >
                    <figure className="relative rounded-2xl bg-white-700 p-6 shadow-xl shadow-slate-900/10">
                      <figcaption>
                        <Image
                          alt="Original room"
                          src={testimonial.pic}
                          className="rounded-2xl h-full"
                          width={280}
                          height={280}
                        />
                      </figcaption>
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-gray-700">
                          "{testimonial.content}"
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-gray-700">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-gray-400">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt="picture of the testimonial author"
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
