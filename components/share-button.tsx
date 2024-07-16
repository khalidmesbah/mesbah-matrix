import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShareIcon } from 'lucide-react';
import {
  EmailIcon,
  EmailShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import CopyToClipboard from './copy-to-clipboard';

type ShareButtonProps = {
  url: string;
  title?: string;
};

export default function ShareButton({ url, title }: ShareButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <ShareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={url} readOnly />
          </div>
          <CopyToClipboard text={url} />
        </div>
        <div className="flex gap-2 flex-wrap">
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <RedditShareButton url={url} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <WhatsappShareButton url={url} title={title} separator=" :: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <PocketShareButton url={url} title={title}>
            <PocketIcon size={32} round />
          </PocketShareButton>
          <InstapaperShareButton url={url} title={title}>
            <InstapaperIcon size={32} round />
          </InstapaperShareButton>
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <EmailShareButton url={url} subject={'sharing content from Mesbah Matrix'} body={title}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
