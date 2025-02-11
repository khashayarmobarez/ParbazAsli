import React from 'react';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const EquipmentCard = ({ 
    equipment, 
    equipmentType, 
    handleEditEquipment, 
    handlePossession, 
    handleSubmittingTransfer, 
    loadingTriggerEquipmentStatus 
}) => {

    const { t } = useTranslation();

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='w-full flex flex-col items-center'>
                <div key={equipment.id} className={`bg-bgCard z-10 w-full justify-between items-center px-5 py-4 rounded-[34px] flex flex-col gap-y-4 md:gap-6 `}
                style={{ boxShadow: 'var(--shadow-all)' }}>

                    {
                        equipment.ownershipStatus === 'Pending' &&
                        <p className='text-textWarning font-bold'>{t('equipment.pendingTransfer', { transferorFullName: equipment?.transferorFullName })}</p>
                    }

                    <div className='w-full text-xs flex justify-between items-start gap-y-1'>

                        <p className='text-start'>
                            {t('equipment.brandModel', { brand: equipment.brand, model: equipment.model })}
                            {equipmentType === "Wing" && ` / ${t('equipment.wingClass', { wingClass: equipment.wingClass })}`}
                        </p>

                        {
                            equipment.ownershipStatus !== 'Pending' &&
                            <p>{t('equipment.flightCountDuration', { flightCount: equipment.flightCount, flightDuration: equipment.flightDuration })}</p>
                        }

                    </div>

                    <div className={`w-full text-xs flex justify-between gap-y-2 items-center ${equipment.ownershipStatus === 'Pending' && '-mt-4'}`}>
                        
                        {
                            equipment.ownershipStatus === 'Pending' &&
                            <p>{t('equipment.serialNumber', { serialNumber: equipment.serialNumber })}</p>
                        }

                        <button className={`${ButtonStyles.normalButton} ${equipment.ownershipStatus === 'Pending' && '-mt-2'} w-[33%] h-10`}
                            style={{ minWidth: '0', minHeight: '0' }}
                            onClick={handleEditEquipment(equipment.id)}>
                            {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') && equipment.ownershipStatus !== 'Pending' ?
                                t('equipment.edit')
                                :
                                t('equipment.details')
                            }
                        </button>

                        {
                            equipment.ownershipStatus !== 'Pending' &&
                            <button
                                className={`w-[33%] h-10
                                ${!equipment?.isTransitionRestricted && ButtonStyles.normalButton}
                                ${equipment?.isTransitionRestricted && 'bg-bgButtonSecondaryDisabled text-textWarning h-[40px] rounded-3xl'}`}
                                style={{ minWidth: '0', minHeight: '0' }}
                                onClick={handlePossession(equipment.id)}
                                disabled={equipment?.isTransitionRestricted}>
                                {equipment?.isTransitionRestricted ?
                                    t('equipment.transferRestricted')
                                    :
                                    t('equipment.transfer')
                                }
                            </button>
                        }

                    </div>
                </div>
                {
                    equipment.ownershipStatus === 'Pending' &&
                    <div className='w-full min-h-16 rounded-b-[34px] z-0 mt-[-1.4rem] pt-5 flex justify-between px-4 bg-bgOutputDefault '
                        style={{ boxShadow: 'var(--shadow-all)' }}>
                        <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                            <div className='w-2 h-2 rounded-full bg-textError'></div>
                            <p>{t('equipment.accept')}</p>
                        </div>
                        <div className='flex gap-x-6 items-center px-2'>
                            <p
                                onClick={() => handleSubmittingTransfer('accept', equipment.id)}
                                disabled={loadingTriggerEquipmentStatus}
                                className='text-textAccent text-sm font-medium'>
                                {t('equipment.accept')}
                            </p>
                            <p
                                onClick={() => handleSubmittingTransfer('decline', equipment.id)}
                                disabled={loadingTriggerEquipmentStatus}
                                className='text-textError text-sm font-medium'>
                                {t('equipment.reject')}
                            </p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default EquipmentCard;