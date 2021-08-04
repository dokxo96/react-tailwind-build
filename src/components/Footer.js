export default function footer() {
    return (
        <footer className=" bg-blue-500 px-16  font-light flex flex-col lg:flex-row justify-between items-center">
            <p className="text-white mb-6 lg:mb-0">
                Copyright &copy; {new Date().getFullYear()}{' '}
                <a
                     
                  
                    className="text-white hover:text-gray-700"
                >
                    Vitere, S.A de C.V.
                </a>
            </p>

          
        </footer>
    );
}
