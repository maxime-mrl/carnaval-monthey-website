import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

type CarouselSpacingProps = {
    images: { src: string; alt: string }[]
}

export  function CarouselSpacing({ images }: CarouselSpacingProps) {
    return (
        <Carousel>
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem className="flex-center pl-2 md:pl-4" key={index}>
                        <img src={image.src} alt={image.alt} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}