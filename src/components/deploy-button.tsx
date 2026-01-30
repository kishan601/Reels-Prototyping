'use client';

import { Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type DeployButtonProps = Omit<ButtonProps, 'variant'> & {
  buttonText?: string;
  variant?: ButtonProps['variant'] | 'accent';
  reelName?: string;
};

export function DeployButton({
  buttonText = 'Deploy',
  variant = 'default',
  className,
  reelName,
  ...props
}: DeployButtonProps) {
  const { toast } = useToast();

  const handleDeploy = () => {
    toast({
      title: 'Deployment Initiated',
      description: `${
        reelName ? `"${reelName}"` : 'Your reel'
      } is being deployed to screens.`,
    });
  };

  const isAccent = variant === 'accent';
  const finalVariant = isAccent ? 'default' : variant;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={finalVariant}
          className={cn(
            isAccent && 'bg-accent text-accent-foreground hover:bg-accent/90',
            className
          )}
          {...props}
        >
          <Rocket className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to deploy?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will start the deployment process for{' '}
            {reelName ? `the "${reelName}" reel` : 'this reel'}. You can monitor
            the progress in your deployments dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeploy}>Deploy</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
