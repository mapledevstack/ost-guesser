import { SiGithub } from "react-icons/si"
import { Button } from "../ui/button"

const GitHub = () => {
  return (
    <div className="fixed bottom-4 left-4">
      <Button
        variant="link"
        size="sm"
        nativeButton={false}
        render={
          <a
            href="https://github.com/mapledevstack/ost-guesser"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <SiGithub className="size-full" />
          </a>
        }
      ></Button>
    </div>
  )
}

export default GitHub
