"use client";

import { useEffect, useState } from 'react';
import { Community, Flair } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFlairSchema, FlairSchema } from '@/libs/validators/community-validator';
import { createFlair, deleteFlair, fetchFlairsForCommunity, updateFlair } from '@/libs/api';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ConfirmDialog from '@/components/shared/ConfirmDialog';


const FLAIR_COLORS = [ "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899" ];

interface ManageFlairsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  community: Community;
}

export default function ManageFlairsDialog({ isOpen, onOpenChange, community }: ManageFlairsDialogProps) {
  const [ flairs, setFlairs ] = useState<Flair[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ editingFlairId, setEditingFlairId ] = useState<string | null>(null);

  // State for the delete confirmation
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
  const [ flairToDelete, setFlairToDelete ] = useState<Flair | null>(null);

  const { register, handleSubmit, control, reset, setValue, formState: { errors, isSubmitting } } = useForm<TFlairSchema>({
    resolver: zodResolver(FlairSchema),
    defaultValues: { name: '', color: FLAIR_COLORS[ 0 ] },
  });

  // Fetch flairs when dialog opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchFlairsForCommunity(community.id).then(data => {
        setFlairs(data);
        setIsLoading(false);
      });
    }
  }, [ isOpen, community.id ]);

  const handleEditClick = (flair: Flair) => {
    setEditingFlairId(flair.id);
    setValue('name', flair.name);
    setValue('color', flair.color);
  };

  const handleCancelEdit = () => {
    setEditingFlairId(null);
    reset({ name: '', color: FLAIR_COLORS[ 0 ] });
  };

  const handleDeleteClick = (flair: Flair) => {
    setFlairToDelete(flair);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!flairToDelete) return;
    await deleteFlair(flairToDelete.id);
    setFlairs(prev => prev.filter(f => f.id !== flairToDelete.id));
    toast.success(`Flair "${flairToDelete.name}" has been deleted.`);
    setIsDeleteDialogOpen(false);
    setFlairToDelete(null);
  };

  const onSubmit = async (data: TFlairSchema) => {
    try {
      if (editingFlairId) { // We are editing
        const updatedFlair = await updateFlair(editingFlairId, data);
        setFlairs(prev => prev.map(f => f.id === editingFlairId ? updatedFlair : f));
        toast.success("Flair updated successfully.");
      } else { // We are creating
        const newFlair = await createFlair(data, community.id);
        setFlairs(prev => [ ...prev, newFlair ]);
        toast.success("New flair created.");
      }
      handleCancelEdit(); // Reset form
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <>
      <Dialog open={ isOpen } onOpenChange={ onOpenChange }>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Flairs for c/{ community.slug }</DialogTitle>
            <DialogDescription>Create, edit, and delete the post flairs for your community.</DialogDescription>
          </DialogHeader>

          <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side: List of existing flairs */ }
            <div className="space-y-2">
              <h4 className="font-semibold">Existing Flairs</h4>
              { isLoading ? <p>Loading...</p> : flairs.map(flair => (
                <div key={ flair.id } className="flex justify-between items-center p-2 rounded-md border">
                  <Badge style={ { backgroundColor: flair.color, color: '#FFFFFF' /* Simple contrast */ } }>{ flair.name }</Badge>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={ () => handleEditClick(flair) }><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={ () => handleDeleteClick(flair) }><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              )) }
              { flairs.length === 0 && !isLoading && <p className="text-sm text-muted-foreground">No flairs created yet.</p> }
            </div>

            {/* Right side: Form for creating/editing */ }
            <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
              <h4 className="font-semibold">{ editingFlairId ? "Edit Flair" : "Create New Flair" }</h4>
              <div>
                <Input { ...register('name') } placeholder="Flair text (e.g., 'Discussion')" />
                { errors.name && <p className="text-xs text-destructive mt-1">{ errors.name.message }</p> }
              </div>
              <div>
                <Controller
                  control={ control }
                  name="color"
                  render={ ({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      { FLAIR_COLORS.map(color => (
                        <button type="button" key={ color } onClick={ () => field.onChange(color) }
                          style={ { backgroundColor: color } }
                          className={ `h-8 w-8 rounded-full border-2 ${field.value === color ? 'border-primary' : 'border-transparent'}` }
                        />
                      )) }
                    </div>
                  ) }
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={ isSubmitting }>
                  { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
                  { editingFlairId ? "Save Changes" : "Create Flair" }
                </Button>
                { editingFlairId && <Button type="button" variant="ghost" onClick={ handleCancelEdit }>Cancel</Button> }
              </div>
            </form>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={ () => onOpenChange(false) }>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={ isDeleteDialogOpen }
        onOpenChange={ setIsDeleteDialogOpen }
        onConfirm={ handleConfirmDelete }
        title={ `Delete "${flairToDelete?.name}" flair?` }
        description="This flair will be removed from all posts it is currently applied to. This action cannot be undone."
        confirmText="Yes, delete"
      />
    </>
  );
}
