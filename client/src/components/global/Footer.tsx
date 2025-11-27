import {
  //   ArrowsCounterClockwiseIcon,
  CheckCircleIcon,
  CookieIcon,
  HouseSimpleIcon,
  QuestionIcon,
  RssSimpleIcon,
  SidebarIcon,
  SidebarSimpleIcon,
  TerminalWindowIcon,
  TrashIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Btn from "./Btn";

export const Footer = () => {
  return (
    <div className="h-[25px] flexbox w-full border-t border-accent2 p-1">
      <div className="fbox mr-3">
        <Btn className="fbox-btn" icon={<SidebarIcon />} />
      </div>
      <div className="flexbox gap-2.5">
        <div className="fbox">
          <Btn className="fbox-btn" icon={<CheckCircleIcon />} />
          <span className="fbox-text">online</span>
          {/* <Btn className="fbox-btn" icon={<ArrowsCounterClockwiseIcon />} />
          <span className="fbox-text">Connecting</span> */}
          {/* <Btn className="fbox-btn" icon={<ArrowsCounterClockwiseIcon />} />
          <span className="fbox-text">offline</span> */}
        </div>

        <div className="fbox">
          <Btn className="fbox-btn" icon={<TerminalWindowIcon />} />
          <span className="fbox-text">console</span>
        </div>
      </div>
      <div className="flexbox  flex-1 justify-end  gap-3 ">
        <div className="fbox">
          <Btn className="fbox-btn" icon={<YoutubeLogoIcon />} />
          <span className="fbox-text">Runner</span>
        </div>
        <div className="fbox">
          <Btn className="fbox-btn" icon={<RssSimpleIcon />} />
          <span className="fbox-text">Capture requests</span>
        </div>
        <div className="fbox">
          <Btn className="fbox-btn" icon={<CheckCircleIcon />} />
          <span className="fbox-text">Cloud Agent</span>
        </div>
        <div className="fbox">
          <Btn className="fbox-btn" icon={<CookieIcon />} />
          <span className="fbox-text">Cookies</span>
        </div>
        <div className="fbox">
          <Btn className="fbox-btn" icon={<HouseSimpleIcon />} />
          <span className="fbox-text">Vault</span>
        </div>
        <div className="fbox">
          <Btn className="fbox-btn" icon={<TrashIcon />} />
          <span className="fbox-text">Trash</span>
        </div>
      </div>
      <div className="flexbox ml-3.5 mr-1 gap-3.5">
        <Btn className="fbox-btn" icon={<SidebarSimpleIcon />} />
        <Btn className="fbox-btn" icon={<QuestionIcon />} />
      </div>
    </div>
  );
};
