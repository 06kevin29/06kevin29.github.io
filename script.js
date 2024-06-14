document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    const menuToggleInput = document.querySelector("#menuToggle input");
    const menuItems = document.querySelectorAll("#menu li");
    const logo = document.getElementById("logo")

    function smoothScroll(target) {
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    }

    function getCurrentSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSection = sections[0];

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentSection = section;
            }
        });

        return currentSection;
    }

    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;

        const currentSection = getCurrentSection();
        let targetSection;

        if (e.deltaY > 0) {
            targetSection = currentSection.nextElementSibling;
        } else {
            targetSection = currentSection.previousElementSibling;
        }
        if (targetSection && targetSection.tagName === 'SECTION') {
            isScrolling = true;
            smoothScroll(targetSection);
            setTimeout(() => {
                isScrolling = false;
            }, 0);
        }
    });

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetId = item.id.replace("menu-", "");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });

                menuToggleInput.checked = false;
            }
        });
    });

    logo.addEventListener("click", () => {
        (document.getElementById("home")).scrollIntoView({
            behavior: "smooth"
        })
    });
});
