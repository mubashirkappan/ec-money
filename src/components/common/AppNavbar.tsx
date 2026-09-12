"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
} from "react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { env } from "@/lib/env";

import { useLogout } from "@/lib/auth/logout";

import { userNavigation, adminNavigation } from "@/config/navigation";
import { authCookies } from "@/lib/cookies";
import Image from "next/image";
import logo from "@/assets/images/logo.png"


/* =========================================================
   ROUTE TYPE
========================================================= */

interface RouteItem {
  name: string;
  href: string;
  icon: ElementType;
}


/* =========================================================
   ROUTES
========================================================= */

// const routes: RouteItem[] = [
//   {
//     name: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Send Money",
//     href: "/payment",
//     icon: CreditCard,
//   },
//   {
//     name: "Transactions",
//     href: "/transactions",
//     icon: History,
//   },
//   {
//     name: "Beneficiary",
//     href: "/beneficiaries",
//     icon: UserRoundPlus,
//   },
//   {
//     name: "Customers",
//     href: "/customers",
//     icon: UserRoundPlus,
//   },
//   {
//     name: "Wallet Credit",
//     href: "/wallet-credit",
//     icon: UserRoundPlus,
//   },

//   /*
//     Add future routes here.

//     Example:

//     {
//       name: "Accounts",
//       href: "/accounts",
//       icon: Landmark,
//     },

//     {
//       name: "Reports",
//       href: "/reports",
//       icon: FileText,
//     },
//   */
// ];


/* =========================================================
   CONSTANTS
========================================================= */

const MOBILE_BREAKPOINT = 768;

/*
  Maximum number of navbar slots.

  Example:

  5 routes that fit:

  A | B | C | D | E

  More required:

  A | B | C | D | More
*/
const MAX_NAV_ITEMS = 5;

/*
  When More is required:

  4 routes + More
*/
const MAX_VISIBLE_WITH_MORE = 4;


/* =========================================================
   COMPONENT
========================================================= */

export default function AppNavbar() {

  const logout = useLogout(); 

  const pathname = usePathname();

  const userType = authCookies.getUserType();

  const userName = authCookies.getUsername();

  const userEmail = authCookies.getEmail();

  /* =========================================================
     REFS
  ========================================================= */

  const headerRef =
    useRef<HTMLElement>(null);

  const leftRef =
    useRef<HTMLDivElement>(null);

  const rightRef =
    useRef<HTMLDivElement>(null);

  /*
    Hidden elements used only for measuring
    the actual width of each route.
  */

  const measurementRefs =
    useRef<(HTMLAnchorElement | null)[]>([]);

  const moreMeasurementRef =
    useRef<HTMLButtonElement>(null);


  /* =========================================================
     STATE
  ========================================================= */

  /*
    Initially show all routes.

    This prevents More from incorrectly
    showing everything during the first render.
  */

  const routes = userType === "admin"
      ? adminNavigation
      : userNavigation;

  const [visibleRoutes, setVisibleRoutes] =
    useState<RouteItem[]>(routes);


  const [isMobile, setIsMobile] =
    useState(false);


  /*
    Don't render desktop navigation until
    the widths have been measured.
  */

  const [navigationReady, setNavigationReady] =
    useState(false);


  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isRouteActive = (href: string) => {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };


  /* =========================================================
     CALCULATE NAVIGATION
  ========================================================= */

  useEffect(() => {

    const calculateNavigation = () => {

      const header = headerRef.current;
      const left = leftRef.current;
      const right = rightRef.current;


      if (
        !header ||
        !left ||
        !right
      ) {
        return;
      }


      const headerWidth =
        header.clientWidth;


      /* =====================================================
         MOBILE
      ===================================================== */

      if (
        headerWidth <
        MOBILE_BREAKPOINT
      ) {

        setIsMobile(true);

        setVisibleRoutes([]);

        setNavigationReady(true);

        return;
      }


      setIsMobile(false);


      /* =====================================================
         AVAILABLE WIDTH
      ===================================================== */

      const leftWidth =
        left.offsetWidth;

      const rightWidth =
        right.offsetWidth;


      /*
        Space reserved on both sides.

        This prevents the center navigation
        from touching the left/right sections.
      */

      const horizontalPadding = 32;


      const availableWidth =
        headerWidth -
        leftWidth -
        rightWidth -
        horizontalPadding;


      /* =====================================================
         ROUTE WIDTHS
      ===================================================== */

      const routeWidths =
        routes.map((_, index) => {

          return (
            measurementRefs
              .current[index]
              ?.offsetWidth ?? 0
          );

        });


      /*
        Wait until all route measurements
        are available.

        This prevents More from
        incorrectly containing everything.
      */

      if (
        routeWidths.some(
          (width) => width === 0
        )
      ) {
        return;
      }


      /* =====================================================
         MORE WIDTH
      ===================================================== */

      const moreWidth =
        moreMeasurementRef.current
          ?.offsetWidth ?? 80;


      const gap = 4;


      /* =====================================================
         CHECK IF ALL ROUTES FIT
      ===================================================== */

      /*
        Only possible when there are
        5 or fewer routes.
      */

      if (
        routes.length <= MAX_NAV_ITEMS
      ) {

        let totalWidth = 0;

        let allFit = true;


        for (
          let i = 0;
          i < routes.length;
          i++
        ) {

          const gapBefore =
            i > 0
              ? gap
              : 0;


          totalWidth +=
            gapBefore +
            routeWidths[i];


          if (
            totalWidth >
            availableWidth
          ) {

            allFit = false;

            break;
          }
        }


        /*
          Everything fits.

          Example:

          4 routes:

          Dashboard | Send Money |
          Transactions | Beneficiary

          5 routes:

          Dashboard | Send Money |
          Transactions | Beneficiary | Accounts
        */

        if (allFit) {

          setVisibleRoutes(routes);

          setNavigationReady(true);

          return;
        }
      }


      /* =====================================================
         MORE IS REQUIRED
      ===================================================== */

      const visible: RouteItem[] = [];

      let usedWidth = 0;


      /*
        Maximum:

        4 routes + More

        More becomes the 5th slot.
      */

      for (
        let i = 0;
        i < routes.length;
        i++
      ) {

        /*
          Never show more than 4
          actual routes when More
          is required.
        */

        if (
          visible.length >=
          MAX_VISIBLE_WITH_MORE
        ) {
          break;
        }


        const routeWidth =
          routeWidths[i];


        const gapBefore =
          visible.length > 0
            ? gap
            : 0;


        /*
          Reserve space for:

          gap + More
        */

        const moreSpace =
          gap + moreWidth;


        const nextWidth =
          usedWidth +
          gapBefore +
          routeWidth +
          moreSpace;


        if (
          nextWidth <=
          availableWidth
        ) {

          visible.push(
            routes[i]
          );


          usedWidth +=
            gapBefore +
            routeWidth;

        } else {

          break;
        }
      }


      /* =====================================================
         MAKE SURE MORE IS ACTUALLY NEEDED
      ===================================================== */

      const hasHiddenRoutes =
        visible.length <
        routes.length;


      /*
        If nothing is hidden,
        show everything.
      */

      if (!hasHiddenRoutes) {

        setVisibleRoutes(routes);

      } else {

        setVisibleRoutes(visible);

      }


      setNavigationReady(true);
    };


    /* =======================================================
       INITIAL CALCULATION
    ======================================================= */

    const frame =
      requestAnimationFrame(
        calculateNavigation
      );


    /* =======================================================
       RESIZE OBSERVER
    ======================================================= */

    const resizeObserver =
      new ResizeObserver(() => {

        requestAnimationFrame(
          calculateNavigation
        );

      });


    if (headerRef.current) {

      resizeObserver.observe(
        headerRef.current
      );

    }


    window.addEventListener(
      "resize",
      calculateNavigation
    );


    /* =======================================================
       CLEANUP
    ======================================================= */

    return () => {

      cancelAnimationFrame(frame);

      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        calculateNavigation
      );

    };

  }, []);


  /* =========================================================
     HIDDEN ROUTE MEASUREMENTS
  ========================================================= */

  const measurementElements = (

    <div
      className="
        pointer-events-none
        absolute
        left-0
        top-0
        flex
        gap-1
        opacity-0
      "
      aria-hidden="true"
    >

      {routes.map(
        (route, index) => (

          <Link
            key={route.href}
            ref={(element) => {

              measurementRefs
                .current[index] =
                element;

            }}
            href={route.href}
            className="
              whitespace-nowrap
              rounded-md
              px-4
              py-2
              text-sm
              font-medium
            "
            tabIndex={-1}
          >

            {route.name}

          </Link>

        )
      )}


      {/* More measurement */}

      <Button
        ref={moreMeasurementRef}
        variant="ghost"
        className="
          whitespace-nowrap
          px-3
          text-sm
          font-medium
        "
        tabIndex={-1}
      >

        More

        <ChevronDown
          className="size-4"
        />

      </Button>

    </div>
  );


  /* =========================================================
     HIDDEN ROUTES
  ========================================================= */

  const hiddenRoutes =
    routes.filter(
      (route) =>
        !visibleRoutes.some(
          (visibleRoute) =>
            visibleRoute.href ===
            route.href
        )
    );


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <header
      ref={headerRef}
      className="
        fixed
        inset-x-0
        top-0
        z-50
        h-16
        w-full
        border-b
        bg-background
      "
    >

      <div
        className="
          relative
          flex
          h-16
          items-center
          px-4
        "
      >

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div
          ref={leftRef}
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >

          {/* =================================================
              MOBILE MENU
          ================================================= */}

          <Sheet>

            <SheetTrigger asChild>

              <Button
                variant="ghost"
                size="icon"
                className="
                  shrink-0
                  md:hidden
                "
              >

                <Menu
                  className="size-5"
                />

                <span className="sr-only">
                  Open navigation
                </span>

              </Button>

            </SheetTrigger>


            <SheetContent
              side="left"
              className="
                w-[280px]
                sm:w-[320px]
              "
            >

              <SheetHeader>

                <SheetTitle>
                  Navigation
                </SheetTitle>

              </SheetHeader>


              <nav
                className="
                  mt-6
                  flex
                  flex-col
                  gap-1
                "
              >

                {routes.map(
                  (route) => {

                    const Icon =
                      route.icon;

                    const isActive =
                      isRouteActive(
                        route.href
                      );


                    return (

                      <Link
                        key={route.href}
                        href={route.href}
                        className={`
                          flex
                          items-center
                          gap-3
                          rounded-md
                          px-3
                          py-2.5
                          text-sm
                          font-medium
                          transition-colors
                          hover:bg-accent
                          hover:text-accent-foreground
                          ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground"
                          }
                        `}
                      >

                        <Icon
                          className="size-5"
                        />

                        <span>
                          {route.name}
                        </span>

                      </Link>

                    );

                  }
                )}

              </nav>

            </SheetContent>

          </Sheet>


          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/dashboard"
            className="
              flex
              items-center
              gap-2
            "
          >
            <Image
              src={logo}
              alt="World Trade Transfer"
              className="size-12"
            />

            {/* <div
              className="
                flex
                size-9
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-gradient-to-br
                from-indigo-400
                to-emerald-300
                text-black
              "
            >

              <Wallet
                className="size-5"
              />

            </div> */}


            <span
              className="
                hidden
                font-semibold
                sm:block
              "
            >
              {env.appName}
            </span>

          </Link>

        </div>


        {/* ===================================================
            CENTER NAVIGATION
        =================================================== */}

        {navigationReady &&
          !isMobile && (

            <nav
              className="
                absolute
                left-1/2
                hidden
                -translate-x-1/2
                items-center
                gap-1
                md:flex
              "
            >

              {/* =================================================
                  VISIBLE ROUTES
              ================================================= */}

              {visibleRoutes.map(
                (route) => {

                  const isActive =
                    isRouteActive(
                      route.href
                    );


                  return (

                    <Link
                      key={route.href}
                      href={route.href}
                      className={`
                        whitespace-nowrap
                        rounded-md
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition-colors
                        ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }
                      `}
                    >

                      {route.name}

                    </Link>

                  );

                }
              )}


              {/* =================================================
                  MORE
              ================================================= */}

              {hiddenRoutes.length > 0 && (

                <DropdownMenu>

                  <DropdownMenuTrigger
                    asChild
                  >

                    <Button
                      variant="ghost"
                      className="
                        whitespace-nowrap
                        px-3
                        text-sm
                        font-medium
                      "
                    >

                      More

                      <ChevronDown
                        className="size-4"
                      />

                    </Button>

                  </DropdownMenuTrigger>


                  <DropdownMenuContent
                    align="start"
                    className="w-48"
                  >

                    {hiddenRoutes.map(
                      (route) => {

                        // const Icon = route.icon;


                        return (

                          <DropdownMenuItem
                            key={route.href}
                            asChild
                            className="cursor-pointer py-2!"
                          >

                            <Link
                              href={route.href}
                              className="whitespace-nowrap text-sm font-medium"
                            >

                              {/* <Icon /> */}

                              {route.name}

                            </Link>

                          </DropdownMenuItem>

                        );

                      }
                    )}

                  </DropdownMenuContent>

                </DropdownMenu>

              )}

            </nav>

          )}


        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div
          ref={rightRef}
          className="
            ml-auto
            flex
            shrink-0
            items-center
            gap-1
          "
        >

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >

            <Bell
              className="size-5"
            />


            {/* Notification dot */}

            <span
              className="
                absolute
                right-2
                top-1
                size-2
                rounded-full
                bg-red-500
              "
            />


            <span className="sr-only">
              Notifications
            </span>

          </Button>


          {/* =================================================
              PROFILE
          ================================================= */}

          <DropdownMenu>

            <DropdownMenuTrigger
              asChild
            >

              <Button
                variant="ghost"
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  px-2
                "
              >

                <Avatar
                  className="size-8"
                >

                  <AvatarFallback>
                    AD
                  </AvatarFallback>

                </Avatar>


                {/* User details */}

                <div
                  className="
                    hidden
                    text-left
                    lg:block
                  "
                >

                  <p
                    className="
                      text-sm
                      font-medium
                      leading-none
                      text-end
                    "
                  >
                    {userName}
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      text-muted-foreground
                    "
                  >
                    {userEmail}
                  </p>

                </div>


                <ChevronDown
                  className="
                    hidden
                    size-4
                    lg:block
                  "
                />

              </Button>

            </DropdownMenuTrigger>


            <DropdownMenuContent
              align="end"
              className="w-56"
            >

              <DropdownMenuLabel>
                My Account
              </DropdownMenuLabel>


              <DropdownMenuSeparator />


              <DropdownMenuItem className="cursor-pointer">

                <User />

                Profile

              </DropdownMenuItem>


              <DropdownMenuItem
                asChild
                className="cursor-pointer"
              >

                <Link
                  href="/dashboard/settings"
                >

                  <Settings />

                  Settings

                </Link>

              </DropdownMenuItem>


              <DropdownMenuSeparator />


              <DropdownMenuItem
                className="
                  text-destructive cursor-pointer
                "
                onClick={logout}
              >

                <LogOut />

                Logout

              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>


        {/* ===================================================
            MEASUREMENT ELEMENTS
        =================================================== */}

        {measurementElements}

      </div>

    </header>
  );
}