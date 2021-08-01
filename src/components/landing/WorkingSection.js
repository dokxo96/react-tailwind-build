import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
 import Teamwork from '../../assets/img/teamwork.jpeg';

export default function WorkingSection() {
    return (
        <section className="pb-20 bg-black -mt-64">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap -mt-24 relative z-50">
                <div className="flex flex-wrap items-center mt-32">
                    <div className="w-full md:w-5/12 px-4 mx-auto">
                        <div className="text-blue-gray-800 mt-4 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                            <Icon name="people" size="3xl" />
                        </div>
                        <H4 color="white">Conviertete en creador</H4>
                        <LeadText color="white">
                           Crea, adquiere, negocia, exhibe, presume, disfruta Contenido exclusivo para mentes abiertas y disruptivas; adueñate de las creaciones y contenido exclusivo original de artistas y modelos que han convertido el placer en un activo digital.

                        </LeadText>
                        <LeadText color="blueGray">
                        Ecosistema 100% anónimo.
                        </LeadText>
                        <a
                            href="#pablo"
                            className="font-medium text-light-blue-500 mt-2 inline-block"
                        >
                            Read More
                        </a>
                    </div>

                    <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center -mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={Teamwork} />
                            <CardBody>
                                <H6 color="gray">Top Notch Services</H6>
                                <Paragraph color="blueGray">
                                    The Arctic Ocean freezes every winter and
                                    much of the sea-ice then thaws every summer,
                                    and that process will continue whatever
                                    happens.
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-wrap items-center mt-32">
                <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center -mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={Teamwork} />
                            <CardBody>
                                <H6 color="gray">Top Notch Services</H6>
                                <Paragraph color="blueGray">
                                    The Arctic Ocean freezes every winter and
                                    much of the sea-ice then thaws every summer,
                                    and that process will continue whatever
                                    happens.
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="w-full md:w-5/12 px-4 mx-auto">
                        <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                            <Icon name="star" size="3xl" />
                        </div>
                        <H4 color="white">Conviertete en Fan</H4>
                        <LeadText color="white">
                           Crea, adquiere, negocia, exhibe, presume, disfruta Contenido exclusivo para mentes abiertas y disruptivas; adueñate de las creaciones y contenido exclusivo original de artistas y modelos que han convertido el placer en un activo digital.

                        </LeadText>
                        <LeadText color="blueGray">
                        Ecosistema 100% anónimo.
                        </LeadText>
                        <a
                            href="#pablo"
                            className="font-medium text-light-blue-500 mt-2 inline-block"
                        >
                            Read More
                        </a>
                    </div>

                 
                </div>
                </div>

            </div>
        </section>
    );
}
